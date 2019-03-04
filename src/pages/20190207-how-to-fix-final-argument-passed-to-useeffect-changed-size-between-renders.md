---
title: "How to fix: useEffect's final argument error"
description: "You want to pass through a prop directly to useEffect's final argument, but React has other ideas."
author: mattperry
date: "20190208"
---

React has a great new Hook that replaces `componentDidMount`, `componentDidUpdate` and `componentWillUnmount` with one simple, functionally-encapsulated API.

It's called [`useEffect`](https://reactjs.org/docs/hooks-effect.html), and it looks like this:

```jsx
const Component = () => {
  useEffect(() => {
    console.log("Rendered!");
  });

  return <div />;
};
```

Its default behaviour is to run after every render, but we can change this behaviour by passing an array of variables as `useEffect`'s final argument. Whenever **one or more of these variables change**, `useEffect` will fire after the next render:

```jsx
useEffect(() => {
  console.log(`The latest count is ${count}`);
}, [count]);
```

So consider this API from Popmotion's [Pose](https://popmotion.io/pose/):

```jsx
<Sidebar pose={['visible', 'active']}>
```

Here, we've got a `pose` property that accepts an array of one or more "poses" to control its animations.

Previously, we'd have used a check in `componentDidUpdate` to manually iterate over the previous and the next arrays to see if they're different to each other:

```javascript
componentDidUpdate(prevProps) {
  const hasChanged = !isArrayEqual(prevProps.pose, this.props.pose)
  if (hasChanged) {
    animate(this.props.pose)
  }
}
```

But now, with `useEffect`'s final argument, it's a simple matter of passing the `pose` array to `useEffect`, and we'll get this comparison for free!

```jsx
useEffect(() => {
  animate(pose);
}, pose);
```

Hell yeah! Except hell no. If the length of `pose` changes, React will throw you this error:

> The final argument passed to useEffect changed size between renders. The order and size of this array must remain constant.

The problem is that we can't always know if an externally-created array is going to change in length.

If can't know it, we shouldn't assume it.

Especially as the insidious truth is, the array may only **rarely** change in length, which means this error might not throw until its out in the wild.

## The fix

If our array is just numbers or strings, this is an easy fix. You can use the [`Array.join()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join):

```jsx
useEffect(() => {
  animate(pose);
}, [pose.join(",")]);
```

So instead of passing an array like this:

```javascript
["visible", "hidden"];
```

You're now passing an array like this:

```javascript
["visible,hidden"];
```

Your array prop will now always take up just one item in the `useEffect` comparitor array.

## What's with the comma?

Oh yeah. So the comma might seem superfluous. After all, it's unlikely that different pose names are going to return the same string when you `join` them.

But crucially, it isn't impossible. And if the array contains numbers instead of strings, this scenario becomes far more likely:

```javascript
[0, 1, 2] -> ['012']
[0, 12] -> ['012']
```

By providing `join` with a separator (it could be any character), you're ensuring the returned string remains unique for all combinations.

```javascript
[0, 1, 2] -> ['0,1,2']
[0, 12] -> ['0,12']
```

## Bloopers

Whenever I post a blog like this with a solution I want to show you any "developer moments" aka "what the fuck was I thinking" moments that I enjoyed along the way.

In this case my initial attempt at fixing the bug was to pad the incoming array by an arbitrary amount. I felt like 10 would be more than enough poses for any one component:

```javascript
useEffect(() => {
  animate(pose);
}, pad(pose, 10));
```

So our `pose` array from before would become:

```javascript
["visible", "hidden", null, null, null, null, null, null, null, null];
```

And the comparitor array given to React would remain the same length, no matter how `pose` grew or shrank.

It worked, but despite `10` being quite a generous pose amount, it's hardly bullet-proof. It also creates a new array which is more memory-intensive than a string. It's not a big deal but when we're dealing with animations its better to keep garbage collection down where you can.
