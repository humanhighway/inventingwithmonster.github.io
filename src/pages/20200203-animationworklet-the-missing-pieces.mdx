---
title: "Animation Worklet: The 4 Missing Features"
description: "There's glimmers of promise in the current Houdini Animation Worklet API proposal, but it won't be an MVP without introducing four specific features."
author: mattperry
date: "20200203"
---

The upcoming [Animation Worklet](https://developers.google.com/web/updates/2018/10/animation-worklet) promises to let developers write performant animations and gestures. But it's four crucial features away from being a solid MVP.

Animation Worklet is part of an interweaving suite of browser APIs collectively called CSS Houdini. Together, they'll offer developers low-level access to various parts of the rendering engine like paint, layout, and of relevance to us, animation.

I've been writing [animation](https://popmotion.io/pure) [libraries](https://framer.com/motion) for over six years to try and help push web UI animations beyond the simple easing curves offered by the browser.

These libraries, and others like them, probably wouldn't exist if browsers offered APIs to create spring, physics or scroll-bound animations. Instead, it's left to developers to fulfill these use-cases. This isn't intrinsically a bad thing, but today we're forced to do so by running our code in the [main thread](https://developer.mozilla.org/en-US/docs/Glossary/Main_thread) via `requestAnimationFrame`.

If you're running an animation or a gesture on the main thread and your site suffers heavy load, users will experience visual jank and sluggish response times.

Animation Worklet is a potential silver bullet that could give developers a similar freedom to `requestAnimationFrame` with more performant results. Worklets run off the main thread and browsers have more freedom to optimise their execution. Users are provided a smooth, app-quality experience.

But this will only be true _if_ the API reaches its full potential. As far as "if"s go, I put that one in italics.

A quick glance at [Is Houdini Ready Yet?](http://ishoudinireadyyet.com/) shows that Animation Worklet suffers some of the poorest support of all the Houdini APIs. For good reason: It isn't fully specced yet, and what has been specced falls short of what I, as a library author, would consider an MVP.

If you're brand new to the Animation Worklet API I highly recommend playing with [this CodeSandbox sandbox](https://codesandbox.io/s/animation-worklet-api-template-vw0mk) while you read [Google's introductory blog post](https://developers.google.com/web/updates/2018/10/animation-worklet).

If you're all caught up, let's take a look at the missing features that we need from this API if it's to live up to its tremendous potential.

## A note on odd choices

Before we get onto the features, I want to make it clear that I think there's some, to speak charitably, "odd" choices in the Animation Worklet API.

For instance, I don't understand why we manipulate `localTime` to generate animation effects. The no-op implementation is easy to explain:

```javascript
animate(currentTime, effect) {
  effect.localTime = currentTime
}
```

We're mapping the output of our attached timeline directly to `localTime`, which the browser passes on to the attached animation effect (usually a `KeyframeEffect`). Clear enough.

But conceptually it breaks down in most real-world situations.

Consider a spring animation:

```javascript
spring({
  from: 0,
  to: 100,
  stiffness: 500,
  damping: 40
});
```

It has no preset `duration`, so its relationship to the current `KeyframeEffect` API is weird. Whatever `duration` we pass to a `KeyframeEffect` attached to a hypothetical worklet spring animation, the one thing it **won't** represent is the duration of the resulting animation.

Likewise, the oddly-conceived `ScrollTimeline` has a `timeRange` option which itself is a hack to bend a spacial concept of progress into a temporal one.

What both of these use-cases share in common with a duration-based easing animation is an **origin**, a **target**, and a **progress** to describe an interpolation between the two.

So an API where we manipulate something more abstract like a `0`-`1` `effect.progress` value would make more sense than the current `localTime`.

However, this is _merely_ an odd choice, and I'm not overly concerned by odd choices. They confuse the API and thus make wrapper libraries critical in lowering the barrier to adoption, but they aren't show-stoppers.

The following missing features _are_ show-stoppers. They're things that we can't effectively design around and will limit the kinds of animations and gestures that the Animation Worklet makes possible.

## 1. I am complete

Currently, there's no specced method for an animation to declare itself complete.

With no cheap or synchronous way to read the output of an Animation Worklet from the main thread there's also no way to sensibly declare an animation finished there, either.

This means that, once started, an animation will run every frame until we know it's safe to manually stop it from the main thread. Which is when the animating element is unmounted, or another animation is started in its place.

So worklets bound to the document timeline will continue to accumulate over a page session, needlessly running once per frame, potentially negating the performance benefits they're designed to avoid.

It also becomes impossible to write code that executes when an animation finishes. Patterns like this are impossible:

```javascript
await animate(element, values);
doOtherThing(); // This will never happen
```

An API like `this.cancel()`, `effect.playState = "finished"`, or `this.timeline.detach(this)` would be an acceptable and simple solution.

In Google's [Spring Sticky demo](https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/spring-sticky/spring-sticky-animator.js), there's the concept of a worklet attaching and detaching itself from a timeline passed in via the worklet's options:

```javascript
this.options.documentTimeline.detach(this);
```

A concept like this is very powerful and would solve the problem problem, as long as a worklet also had access to its primary timeline.

Or maybe the API drops the concept of a primary timeline. In this example they're passing reference to both the `DocumentTimeline` and an element's `ScrollTimeline`, so the worklet can choose when to be driven by each.

This would open up even more possibilities but sadly, this example is only possible by exploiting a bug in the Animation Worklet polyfill. The spec itself (and indeed its Chrome implementation) requires all options to be serialisable. There is talk of adding more [general inputs](https://github.com/w3c/csswg-drafts/issues/2493) which would be a clearer API than using odd concepts like a "scroll timeline", so hopefully this comes to fruition.

[Follow this issue on GitHub](https://github.com/w3c/css-houdini-drafts/issues/808)

## 2. Velocity

One of the examples given in the API's [Motivating Use Cases](https://github.com/w3c/css-houdini-drafts/blob/master/css-animationworklet/README.md) is "spring physics", and indeed this is one of the main use-cases I have for my libraries.

Spring animations have unique value over standard easing animations because they can incorporate velocity from an existing animation, like a drag gesture or easing animation. They're interruptable without the complexity of cross fading or additive animation tricks.

Because of this physics-based approach they create naturalistic and engaging UIs that reflect the user's energy visually.

Google have already made [a spring example](https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/spring-timing/spring-timing-animator.js) so at first glance it looks like this is implementable as soon as we get the ability for an animation to declare itself complete.

However, there's no current way for a worklet to output information like velocity to be incorporated into subsequent animations.

It **is** currently feasible to feed an initial velocity via a worklet's `options`. With some mental leaps it's probably possible to wrangle this velocity into something meaningful to the `effect.localTime` abstraction.

But until there's a way to fish velocity back out of a worklet, this capability is for nothing.

A hypothetical velocity wouldn't need to be permanently accessible, only when an animation is finished. So there'd be no per-frame main thread nonsense to worry about.

```javascript
await animation.play();
const velocity = animation.localTimeVelocity;
```

Alternatively, a timestamped history of the last few **resolved** values (ie `translateX` as pixels) would be enough to calculate a velocity.

Finally, there's the possibility of writing a monolithic worklet library that controls all animations and gestures for the duration of a value's lifecycle. With the ability to [send data to an Animation Worklet](https://bugs.chromium.org/p/chromium/issues/detail?id=932619) it'd be possible to track velocity within the worklet itself. But without unclamped keyframes (which we'll get to next), this wouldn't be a practical match with the current `KeyframeEffect` API.

[Follow this issue on GitHub](https://github.com/w3c/css-houdini-drafts/issues/976)

## 3. Unclamped keyframes

The only way the Animation Worklet API allows us to animate between two or more values over time is via `KeyframeEffect`. It can be configured in the main thread with options like `duration` and `easing`.

However, if a `KeyframeEffect` receives a `localTime` outside of `0` and its `duration` (actually, oddly, 1 millisecond before), it outputs an invalid value and the animating values are reset to default.

We can demonstrate this by opening [the CodeSandbox sandbox in Chrome](https://codesandbox.io/s/animation-worklet-api-template-vw0mk) (turn on Experimental Web Features in `chrome://flags` if you haven't already).

In `index.js` we're configuring `KeyframeEffect` with a `duration` of `1000`. If in `worklet.js` we write:

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

This is a major problem when creating spring animations or extending `KeyframeEffect` with new easing effects that overshoot the provided keyframes range. In an ideal world, the `KeyframeEffect` above would take a `localTime` value like `1500` and get to a play state that is 50% beyond its defined `duration`.

This is because the sane way to implement extra easing functions would be to simply apply them to `currentTime` and use that to set `effect.localTime`:

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

Depending on the under or overshoot effects of the defined easing, the value of `easedProgress` could quite easily be `-0.1` or `1.2`. As it's implemented today, applying this to `localTime` would break the animation.

Google's spring example from before implements a [fairly wild hack](https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/spring-timing/index.html#L68) to avoid this. They multiply the target by `2` to give the animation headroom to overshoot without breaking, and then pass that doubled target to `duration` to bend it into a pixel analog.

There's probably a similar headroom hack possible for supporting new easing types, but the fact that these techniques are necessary in the first place is beyond comprehension. I've written my share of unfriendly APIs but this is quite special.

A wrapper library like Popmotion could hide this added complexity of all this, but even then the headroom hack as Google has implemented it only works with two caveats:

- The origin is `0`.
- The origin and target are both of the same unit type (in this case, pixels).

Point one makes a robust solution unpleasant but it is addressable. The second point is the real killer.

The single best thing about using `KeyframeEffect` is it can animate between different value types. Framer Motion also has this ability but it does so by:

1. Measuring the element in pixels (read)
2. Applying the target styles (write)
3. Measuring it in pixels again (read)
4. Running the animation in pixels (write)
5. Applying the non-pixel target styles when the animation completes (write)

This read/write thrashing is expensive, but try applying the headroom hack to keyframes of `"100%"` and `"calc(50vw + 200px)"`. We can't. We have to perform the expensive read/write circus act even though Animation Worklet is designed to help performance and even though `KeyframeEffect` is perfectly capable of converting between these values.

**Even then**, we can't finish the animation by re-applying the actual target styles (e.g. `"calc(50vw + 200px)"`) because **the animation can't finish**.

An unclamped `KeyframeEffect` would solve all of this.

## 4. Transforming values

In Framer Motion, there's a function called `transform`. It transforms values from one range into another:

```javascript
const a = 50;
const b = transform(50, [0, 100], [0, 1]);
// b === 0.5
```

It can be used to declaratively translate two or more linear numbers into non-linear series of numbers, colors, or complex strings.

For instance in this demo of an Apple Watch app screen, each icon is passively transforming its scale and position from the `x`/`y` position of the pannable container:

<iframe
  src="https://codesandbox.io/embed/goofy-hill-6j6l074q9r?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;margin-bottom: 50px;"
  title="Framer Motion: Apple Watch Dock"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

An Apple-style dock is a very specific implementation but the underlying concept has a wide variety of use-cases.

For instance, Framer Motion's `useInvertedScale` hook uses `transform` it to keep the physical size of child elements consistent even as the scale of their parent changes:

<iframe
  src="https://codesandbox.io/embed/app-store-ui-using-react-and-framer-motion-524c8?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden; margin-bottom: 50px;"
  title="App Store UI using React and Framer Motion"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

This is possible because with the `clamp: false` option, `translate` can map infinite ranges to one another:

```javascript
transform(100, [0, 1], ["0px", "-1px"], { clamp: false }); // "-100px"
```

As far as I can tell none of the above is possible in a generalised sense with the API as it's specced today.

Perhaps if we received unclamped `KeyframeEffect`, and it were possible to pass an existing `WorkletAnimation` as a `timeline` option to another, we'd be close to being able to present this kind of functionality.

## In Conclusion

As an animation geek, the Animation Worklet is the most excited I've been for a browser API, period. I really want it to live up to its potential, and its promise. It's my full-time job to make APIs like this accessible to people who aren't familiar with code, so I'm invested in a professional sense, too.

I haven't touched on the absence of pointer events, but there does seem to be [concerted effort](https://github.com/WICG/input-for-workers) to building pointer support for all worklet types. With these, and a solution for completing animations, querying velocity, unclamping `KeyframeEffect`, and transforming values, Animation Worklet would provide enough functionality to build a complete generalized animation library around.

Given the teeth-pulling process of getting cross-browser support for new APIs, I hope we can get these fixed in the current spec before its finalised.

If you have any thoughts or comments on this article, reach out [on Twitter](https://twitter.com/mattgperry).
