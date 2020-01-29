---
title: "Animation Worklet: The Missing Pieces"
description: "There's some glimmers of promise in the current Houdini Animation Worklet API proposal, but it won't be fit for purpose without these changes."
author: mattperry
date: "20200129"
---

The upcoming [Animation Worklet](https://developers.google.com/web/updates/2018/10/animation-worklet) is part of an interleaving suite of APIs collectively called CSS Houdini. They'll offer developers low-level access to various parts of the browser's rendering engine like paint, layout, and of relevance to us: Animation.

I've spent six years writing animation libraries like [Popmotion](https://popmotion.io/pure) and [Framer Motion](https://framer.com/motion) in an attempt to push web UI animations beyond simple easing curves. These libraries, and others like them, wouldn't need to exist if browsers already offered physics-based animations.

But they don't.

I've always found this fact frustrating, but Animation Worklet is potentially a far better solution than covering just this one use-case.

If it reaches its full potential, the API will offer developers a way to blend time and user input to write animations and gestures that run entirely outside of the main thread.

This means that the code running the animations won't be the cause of slow-down in other parts of your app. And if there is slow-down, they won't suffer visual jank.

But that's **if** the API reaches its full potential. And as far as "if"s go, I put that one in bold.

A quick glance at [Is Houdini Ready?](http://ishoudinireadyyet.com/) shows that Animation Worklet suffers some of the poorest support of all the Houdini APIs. For good reason: It isn't fully specced yet, and what has been specced falls far short of what I would consider an MVP.

In this post we're going to take a

---

## 101

`chrome://flags` Experimental Web Platform features

If you are familiar with the Animation Worklet API, feel free to skip this section.

## I am finished

```javascript
documentTimeline.remove(this);
```

https://github.com/w3c/css-houdini-drafts/issues/808

## Velocity

Unanswered [issue](https://github.com/w3c/css-houdini-drafts/issues/976)

Access to a timestamped history of resolved values for any given animated value.

## Pointer events

https://github.com/w3c/css-houdini-drafts/issues/834

## Unclamped timelines

It's not even possible to support over or under-shoot easing.

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

We already have a Web Animations API that, while limited, is capable enough to perform keyframe animations. In tandem with Houdini's [Properties and Values API](https://web.dev/css-props-and-vals/) (which already enjoys fair cross-browser support) it can finally animate transforms individually, removing my personal final deal-breaker.

The Animation Worklet API is, for someone who has been writing [various](https://popmotion.io/pure) [animation](https://popmotion.io/pose) [libraries](https://framer.com/motion) for six years, the chance of a lifetime.

Unless we see some movement on the list above, it isn't good for anything beyond scroll-driven effects like parallax.
