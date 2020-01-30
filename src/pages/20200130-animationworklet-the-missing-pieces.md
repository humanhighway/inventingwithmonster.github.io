---
title: "Animation Worklet: The Missing Pieces"
description: "There's some glimmers of promise in the current Houdini Animation Worklet API proposal, but it won't be fit for purpose without these changes."
author: mattperry
date: "20200130"
---

The upcoming [Animation Worklet](https://developers.google.com/web/updates/2018/10/animation-worklet) is part of an interweaving suite of browser APIs collectively called CSS Houdini.

Together, they'll offer developers low-level access to various parts of the rendering engine like paint, layout, and of relevance to us, animation.

I've been writing [animation](https://popmotion.io/pure) [libraries](https://framer.com/motion) for over six years to help push web UI animations beyond simple easing curves. These libraries, and others like them, probably wouldn't exist if browsers already offered spring, physics or scroll-bound animations.

But they don't, so it's left to developers to fill in the gaps. Animation Worklet is a potential silver bullet that could let us fill those gaps in a much more performant and responsive way.

Worklets are isolated JavaScript files that run off the main thread. Animations written this way are less likely to be the cause of slow-down in other parts of your app than synchronous `requestAnimationFrame` loops. Likewise, if your site does experience heavy computational load they'll remain smooth and responsive.

But that's _if_ the API reaches its full potential. As far as "if"s go, I put that one in italics.

A quick glance at [Is Houdini Ready Yet?](http://ishoudinireadyyet.com/) shows that Animation Worklet suffers some of the poorest support of all the Houdini APIs. For good reason: It isn't fully specced yet, and what has been specced falls short of what I would consider an MVP.

If you're new to Animation Worklet I highly recommend opening [this CodeSandbox sandbox](https://codesandbox.io/s/animation-worklet-api-template-vw0mk) while you read [Google's introductory blog post](https://developers.google.com/web/updates/2018/10/animation-worklet), which covers the basics of the upcoming API.

Now you're all caught up, let's take a look at the missing pieces that we need from this API if it's to live up to its tremendous potential.

## 1. I am complete

Currently, there's no specced method for an animation to declare itself complete.

With no cheap or synchronous way to read the output of an Animation Worklet there's also no way for the main thread understand when an animation should work, either.

This means that once started, an animation will run every frame until either the animating component is unmounted or another animation is started in its place.

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

A concept like this is very powerful, as long as a worklet also had access to its "primary" timeline (the one passed as `WorkletAnimation`'s third argument).

In the example they're passing reference to both the `DocumentTimeline` and an element's `ScrollTimeline`, so the worklet can choose when to be driven by each.

Sadly, this is only possible by exploiting a bug in the Animation Worklet polyfill, as the spec itself (and indeed its Chrome implementation) requires all options to be serialisable.

[Follow this issue on GitHub](https://github.com/w3c/css-houdini-drafts/issues/808)

## 2. Velocity

One of the examples given in the API's [Motivating Use Cases](https://github.com/w3c/css-houdini-drafts/blob/master/css-animationworklet/README.md) is "spring physics", and indeed this is one of the main use-cases I have for my libraries.

Spring animations are unique to standard easing animations because they can incorporate velocity from an existing animation, like a drag gesture or easing. They're interruptable without using cross fading or additive animation tricks.

Because of this physics-based approach they create naturalistic and engaging UIs that incorporate the user's input.

Google have already made [a spring example](https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/spring-timing/spring-timing-animator.js) and at first glance it looks like this is implementable as soon as we get the ability for an animation to declare itself finished.

However, there is currently no way for a worklet to report its velocity to be incorporated into subsequent animations.

It is currently feasible to feed an initial velocity via `option`s. With some mental leaps it's probably possible to wrangle velocity into something meaningful to the `effect.localTime` abstraction (which is a slight nonsense in the world of springs - an `effect.progress` would be better).

Until there's a way to fish velocity back out of a worklet, this capability is for nothing.

A hypothetical velocity wouldn't need to be permanently accessible, only when an animation is finished. So there'd be no per-frame main thread nonsense to worry about.

```javascript
animation.stop();
const velocity = animation.localTimeVelocity;
```

Alternatively a timestamped history of the last few resolved values (ie `translateX` as pixels) would be enough to calculate a velocity.

Or, there's the possibility of more monolithic worklets that control all animations and gestures for the duration of a value's lifecycle. With the ability to [send data to an Animation Worklet](https://bugs.chromium.org/p/chromium/issues/detail?id=932619) it'd be possible to track velocity within the worklet itself. But without unclamped timelines (which we'll get to next), this wouldn't be a practical match with the current `KeyframeEffect` API.

[Follow this issue on GitHub](https://github.com/w3c/css-houdini-drafts/issues/976)

## 3. Unclamped keyframes

The only way we can run keyframe animations with an Animation Worklet is by creating a `KeyframeEffect`. It can be configured in the main thread with all kinds of options like `duration` and `easing`.

However,

We can demonstrate this by opening [the CodeSandbox sandbox](https://codesandbox.io/s/animation-worklet-api-template-vw0mk). In `index.js` we call the `KeyframeEffect` with a `duration` of `1000`. If in `worklet.js` we write:

```javascript
effect.localTime = 999;
```

We can see the animation is on the final frame. If we change that to a value outside of the provided `duration`:

```javascript
effect.localTime = -1;
// or
effect.localTime = 1000;
```

`KeyframeEffect` produces an invalid value, and the transform breaks completely. Its timeline is essentially clamped.

This is a major problem when creating spring animations or extending `KeyframeEffect` with non-standard easing effects that overshoot the provided keyframes range.

The sane way to implement new easing functions would be to simply treat `localTime` as a kind of progress value. We could

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

Applying this to a `KeyframeEffect` that could gracefully handle times outside of its defined `duration` would naturally lead to appropriately eased motion. As it's implemented today, the animation would simply break.

Google's spring example from before has an [interesting hack to avoid this](https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/spring-timing/index.html#L68). They multiply the target by `2` to give the animation headroom to overshoot without breaking, and then use that doubled target as `duration`.

A library could hide this added complexity, but this hack only works with two caveats:

1. The origin is `0`.
2. The origin and target are both in pixels.

Point one makes the solution increasingly unpleasant but it is addressable. The second is the real killer.

The best thing about using `KeyframeEffect` is it can animate between different value types. Framer Motion also has this ability but it does so by expensively measuring an element, applying the target styles and measuring it again.

That code is extra baggage in terms of payload, execution speed, and maintenance. But it'd still be necessary in this situation because this hack only works with value types that are the same, and says nothing about `calc()` values.

With an unclamped `KeyframeEffect` this would all be unnecessary.

## 4. Interpolation

In this demo, each app icon is interpolating its scale and position from the x/y position of the pannable container.

<iframe
  src="https://codesandbox.io/embed/goofy-hill-6j6l074q9r?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Framer Motion: Apple Watch Dock"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

In combination with pointer events and unclamped timelines, the ability

In theory, it would be possible to write a library that could give any provided target extra "headroom" on either side.

For instance, to animate between `0` and `100` with an easing function that overshoots

https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/spring-timing/index.html#L68

Problem with this approach is it works great between values of the same type
but one of the true benefits of these brwoser animation APIs is animating between value types

x: "500px"
x: "50vw"

What if 500px is to the left of the element and 100vw is to the right?

```javascript
// Main thread
function animate(element, origin, target, duration) {
  return new WorkletAnimation(
    "tween",
    new KeyframeEffect(
      element,
      { "--x": [origin, target * 2] },
      { duration: duration * 2 }
    ),
    document.timeline
  ).play();
}

// Worklet
registerAnimation(
  "tween",
  class {
    animate(currentTime, effect) {}
  }
);
```

This pushes the accessibility of Animation Worklet deep into "nonsense that only library authors will ever put up with".

The idea of using `localTime` almost as an abstraction

## Conclusion

We already have a Web Animations API that, while limited, is capable enough to perform keyframe animations. In tandem with Houdini's [Properties and Values API](https://web.dev/css-props-and-vals/) (which already enjoys fair cross-browser support) it can finally animate transforms individually, which was my least favourite thing about it.

There's some weirdness about . I still don't understand why we're manipularing `localTime` rather than `progress`, the latter of which makes sense for both keyframes and the oddly conceived `ScrollTimeline`.

But it isn't weirdness that I have a problem with. We can write a library around all of this as long as the underlying API is capable. It's a work in progress in every respect, but given the aforementioned glacial pace of browser implementation I'm highlighting these missing pieces to ensure that when Animation Worklet finally ships, it's good for more than parallax effects.
