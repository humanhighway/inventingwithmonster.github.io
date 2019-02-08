---
title: "How to fix: useEffect's final argument error"
description: "You want to pass through a prop directly to useEffect's final argument, but React has other ideas."
author: mattperry
date: "20190209"
---

React's new [Effect Hook](https://reactjs.org/docs/hooks-effect.html) will, by default, fire after every render.

```jsx
useEffect(() => {
  console.log("It's true, I will fire after every render. TRY TO STOP ME");
});
```

But you change this behaviour by passing an array of variables as `useEffect`'s final argument. Whenever one or more of these variables change, `useEffect` will fire after the next render:

```jsx
useEffect(
  () => {
    console.log("Oh. Nicely done.");
  },
  [count]
);
```

So consider this API from Popmotion's [Pose](https://popmotion.io/pose/) library:

```jsx
<Sidebar pose={['visible', 'active']}>
```

The `pose` property can accept an array of one or more "poses" to control its animations.

Well this is great! Previously, we'd have used something like a `shouldComponentUpdate` to manually iterate over the previous and the next arrays to see if they've changed:

```javascript
shouldComponentUpdate(nextProps) {
  return !isArrayEqual(nextProps.pose, this.props.pose)
}
```

But now it's a simple matter of passing the `pose` array to `useEffect`, and we'll get this for free!

```jsx
useEffect(() => {
  animate(pose);
}, pose);
```

Yeah! Except no. If the length of `pose` changes, React will throw you this error (which is way clearer than in the alpha):

> The final argument passed to useEffect changed size between renders. The order and size of this array must remain constant.

Arrays passed in externally are almost bound to change, and if that's rare this bug isn't going to rear its head except in rare circumstances.

## The easy fix

If our array is just numbers or strings, this is an easy fix. You can use the [`Array.join()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join):

```jsx
useEffect(
  () => {
    animate(pose);
  },
  [pose.join(",")]
);
```

So instead of passing an array like this:

```javascript
["visible", "hidden"];
```

You're now passing an array like this:

```javascript
["visible,hidden"];
```

With the incoming array reduce down to just one item in the comparitor array.

## What's with the comma?

Oh yeah. So the comma might seem superfluous. After all, it's unlikely that different pose names are going to return the same string when you `join` them (but not impossible).

If the array contains numbers this scenario becomes far more likely:

```javascript
[0, 1, 2] -> ['012']
[0, 12] -> ['012']
```

By providing `join` with a separator (it could be any character), you're ensuring the returned string remains unique for all combinations.

## Bloopers

Whenever I post a blog like this with a solution I want to show you any "developer moments" aka "what the fuck was I thinking" moments that I enjoyed along the way.

In this case my initial attempt at fixing the bug was to pad the incoming array by an arbitrary amount. I felt like 10 would be more than enough poses for any one component:

```javascript
useEffect(() => {
  animate(pose);
}, pad(pose, 10));
```

So if our `pose` array from before would become:

```javascript
["visible", "hidden", null, null, null, null, null, null, null, null];
```

And the comparitor array given to React would remain the same length, no matter how `pose` grew or shrank.

It worked, but despite 10 being quite a generous pose amount, it's still brittle. It also creates a new array which is more memory-intensive than a string. It's not a big deal but when we're dealing with animations its better to keep garbage collection down where you can.
