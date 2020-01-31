---
title: "Animation Worklet: The Missing Pieces"
description: "There's some glimmers of promise in the current Houdini Animation Worklet API proposal, but it won't be fit for purpose without these changes."
author: mattperry
date: "20200203"
---

The upcoming [Animation Worklet](https://developers.google.com/web/updates/2018/10/animation-worklet) promises to let developers write performant animations and gestures. But until it adds a few missing pieces, it isn't ready for the job.

Animation Worklet is part of an interweaving suite of browser APIs collectively called CSS Houdini. Together, they'll offer developers low-level access to various parts of the rendering engine like paint, layout, and of relevance to us, animation.

I've been writing [animation](https://popmotion.io/pure) [libraries](https://framer.com/motion) for over six years to try and help push web UI animations beyond simple easing curves. These libraries, and others like them, probably wouldn't exist if browsers already offered spring, physics or scroll-bound animations.

Instead, it's left to developers to fill in the gaps. Today, we're forced to do so by running our code in the [main thread](https://developer.mozilla.org/en-US/docs/Glossary/Main_thread) via `requestAnimationFrame`. If you're running an animation or a gesture and your site suffers heavy computational load, users will experience visual jank and sluggishness.

Animation Worklet is a potential silver bullet that could give developers a similar freedom. Worklets run off the main thread so your users are provided a smooth, app-quality experience.

But that's _if_ the API reaches its full potential. As far as "if"s go, I put that one in italics.

A quick glance at [Is Houdini Ready Yet?](http://ishoudinireadyyet.com/) shows that Animation Worklet suffers some of the poorest support of all the Houdini APIs. For good reason: It isn't fully specced yet, and what has been specced falls short of what I would consider an MVP.

If you're new to Animation Worklet I highly recommend playing with [this CodeSandbox sandbox](https://codesandbox.io/s/animation-worklet-api-template-vw0mk) while you read [Google's introductory blog post](https://developers.google.com/web/updates/2018/10/animation-worklet), which covers the basics of the upcoming API.

If you're all caught up, let's take a look at the missing pieces that we need from this API if it's to live up to its tremendous potential.

## A note on odd choices

Before we get into this, I want to make it clear that I think there's some odd choices in the Animation Worklet API.

For instance, I don't understand why we manipulate `localTime` to generate animation effects. The no-op implementation is easy to explain:

```javascript
animate(currentTime, effect) {
  effect.localTime = currentTime
}
```

But conceptually it breaks down in most real-world situations.

Spring animations have no preset `duration`, so it's odd that we could affect one by changing this in the provided `KeyframeEffect`.

Likewise, the oddly-named `ScrollTimeline` has a `timeRange` option which itself is a bit of a hack to bend a spacial concept of progress into a time one.

What both of use-cases share in common with a duration-based easing animation is an **origin**, a **target**, and a **progress** to describe an interpolation between the two. So manipulating something more abstract like a `0`-`1` `effect.progress` value would make more sense to me.

However, `localTime` is merely an odd choice, and I'm not overly concerned by odd choices.

They confuse the API and thus make wrapper libraries critical in lowering the barrier to adoption.

They aren't show-stoppers though. So the following is a list of things that we currently _can't_ do, not just things that are merely hard or confusing to do.

## 1. I am complete

Currently, there's no specced method for an animation to declare itself complete.

With no cheap or synchronous way to read the output of an Animation Worklet from the main thread there's also no way to sensibly declare an animation finished externally, either.

This means that, once started, an animation will run every frame until either the animating component is unmounted or another animation is started in its place.

So worklets bound to the document timeline will continue to accumulate like cruft over a page session, needlessly running once per frame, potentially negating the performance benefits they're designed to avoid.

It also becomes impossible to write code that executes when an animation is finished. So none of this:

```javascript
await animate(element, values);
doOtherThing(); // This will never happen
```

Any API like `this.cancel()`, `effect.playState = "finished"`, or `this.timeline.detach(this)` would be an acceptable and simple solution.

In Google's [Spring Sticky demo](https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/spring-sticky/spring-sticky-animator.js), there's the concept of a worklet attaching and detaching itself from a timeline passed in via the worklet's options:

```javascript
this.options.documentTimeline.detach(this);
```

A concept like this is very powerful and would solve this problem, as long as a worklet also had access to its "primary" timeline (the one passed as `WorkletAnimation`'s third argument).

In the example it's even better, as they're passing reference to both the `DocumentTimeline` and an element's `ScrollTimeline`, so the worklet can choose when to be driven by each.

Sadly, this is only possible by exploiting a bug in the Animation Worklet polyfill, as the spec itself (and indeed its Chrome implementation) requires all options to be serialisable. There is talk of adding more [general inputs](https://github.com/w3c/csswg-drafts/issues/2493) which will be even better than the weird concepts of "scroll timeline", so hopefully this comes to fruition.

[Follow this issue on GitHub](https://github.com/w3c/css-houdini-drafts/issues/808)

## 2. Velocity

One of the examples given in the API's [Motivating Use Cases](https://github.com/w3c/css-houdini-drafts/blob/master/css-animationworklet/README.md) is "spring physics", and indeed this is one of the main use-cases I have for my libraries.

Spring animations have unique value over standard easing animations because they can incorporate velocity from an existing animation, like a drag gesture or easing. They're interruptable without the complexity of cross fading or additive animation tricks.

Because of this physics-based approach they create naturalistic and engaging UIs that reflect the user's energy.

Google have already made [a spring example](https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/spring-timing/spring-timing-animator.js) and at first glance it looks like this is implementable as soon as we get the ability for an animation to declare itself complete.

However, there no current way for a worklet to report its velocity to be incorporated into subsequent animations.

It is currently feasible to feed an initial velocity via `option`s. With some mental leaps it's probably possible to wrangle velocity into something meaningful to the `effect.localTime` abstraction.

Until there's a way to fish velocity back out of a worklet, this capability is for nothing.

A hypothetical velocity wouldn't need to be permanently accessible, only when an animation is finished. So there'd be no per-frame main thread nonsense to worry about.

```javascript
await animation.play();
const velocity = animation.localTimeVelocity;
```

Alternatively a timestamped history of the last few resolved values (ie `translateX` as pixels) would be enough to calculate a velocity.

Or, there's the possibility of writing monolithic worklets that control all animations and gestures for the duration of a value's lifecycle. With the ability to [send data to an Animation Worklet](https://bugs.chromium.org/p/chromium/issues/detail?id=932619) it'd be possible to track velocity within the worklet itself. But without unclamped keyframes (which we'll get to next), this wouldn't be a practical match with the current `KeyframeEffect` API.

[Follow this issue on GitHub](https://github.com/w3c/css-houdini-drafts/issues/976)

## 3. Unclamped keyframes

The only way we can run keyframe animations with an Animation Worklet is by creating a `KeyframeEffect`. It can be configured in the main thread with all kinds of options like `duration` and `easing`.

However, if a `KeyframeEffect` receives a `localTime` outside of `0` and its `duration` (actually, oddly, 1 millisecond before), it outputs an invalid value and the animating values are reset to default.

We can demonstrate this by opening [the CodeSandbox sandbox in Chrome](https://codesandbox.io/s/animation-worklet-api-template-vw0mk) (turn on Experimental Web Features in `chrome://flags` if you haven't already).

In `index.js` we call the `KeyframeEffect` with a `duration` of `1000`. If in `worklet.js` we write:

```javascript
effect.localTime = 999;
```

We can see the animation is on the final frame. If we change that to a value outside of the provided `duration`:

```javascript
effect.localTime = -1;
// or
effect.localTime = 1000;
```

`KeyframeEffect` produces an invalid value, and the transform breaks completely. Practically speaking, **it's clamped**.

This is a major problem when creating spring animations or extending `KeyframeEffect` with non-standard easing effects that overshoot the provided keyframes range.

The sane way to implement new easing functions would be to simply apply easing to `currentTime` and apply that directly to `effect.localTime`.

```javascript
// worklet.js
import * as easing from "@popmotion/easing";

registerAnimation(
  "tween",
  class {
    constructor({ duration = 1000, easing = "backOut" } = {}) {
      this.duration = duration;
      this.easing = easing[easing];
    }

    animate(currentTime, effect) {
      const progress = Math.min(currentTime / this.duration, 1);
      const easedProgress = this.easing(progress);
      effect.localTime = this.duration * easedProgress;
    }
  }
);
```

Depending on the under or overshoot effects of `easing`, the value of `easedProgress` could quite easily be `-0.1` or `1.2`.

Applying this to an ideal `KeyframeEffect` that could gracefully handle times outside of its defined `duration` would result in appropriately eased motion. As it's implemented today, the animation would simply break.

Google's spring example from before has an [interesting hack to avoid this](https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/spring-timing/index.html#L68). They multiply the target by `2` to give the animation headroom to overshoot without breaking, and then use that doubled target as `duration`.

A wrapper library could hide this added complexity, but the hack only works with two caveats:

1. The origin is `0`.
2. The origin and target are both of the same unit type (in this case, pixels).

Point one makes the solution increasingly unpleasant but it is addressable. The second is the real killer.

The best thing about using `KeyframeEffect` is it can animate between different value types. Framer Motion also has this ability but it does so by expensively measuring an element, applying the target styles and measuring it again.

That code is extra baggage in terms of payload, execution speed, and maintenance. But it'd still be necessary in this situation because this hack only works with value types that are the same, and says nothing about `calc()` values.

With an unclamped `KeyframeEffect` this complexity would disappear.

## 4. Transforming values

In Framer Motion, there's a function called `transform`. It transforms values from one range into another:

```javascript
const a = 50;
const b = transform(50, [0, 100], [0, 1]);
// b === 0.5
```

It's very powerful. It can translate from two or more linear numbers into non-linear numbers, colors, or complex strings.

In this demo, each app icon is passively transforming its scale and position from the position of the pannable container.

<iframe
  src="https://codesandbox.io/embed/goofy-hill-6j6l074q9r?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;margin-bottom: 50px;"
  title="Framer Motion: Apple Watch Dock"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

In combination with pointer events and an unclamped `KeyframeEvent`, the ability to do all this away from the main thread would be very powerful.

It isn't possible with the API as specced today, but you could perhaps imagine the ability to pass an existing `WorkletAnimation` as a `timeline` option or `input` to a special `"transform"` worklet.

## In Conclusion

As an animation geek, the Animation Worklet is the only browser API on the horizon that I care about. I really want it to live up to its potential, and its promise.

I haven't touched on the absence of pointer events, but there does seem to be [concerted effort](https://github.com/WICG/input-for-workers) to building support for these for all worklet types.

Between pointer support and a solution for completing animations, querying velocity, unclamping `KeyframeEffect`, or transforming values, in the real world Animation Worklet isn't currently capable of much more than parallax effects.

Given the teeth-pulling process of getting cross-browser support for new APIs, I hope we can get these fixed in the current spec before its finalised.
