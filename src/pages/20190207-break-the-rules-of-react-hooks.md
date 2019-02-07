---
title: How to break the rules of React Hooks
description: "'Don't see limitations, only possibilities.' ~ Einstein. Or maybe Bruce Lee."
author: mattperry
date: "20190207"
---

React Hooks have finally landed! So many emotions. Here’s a small selection of my own in chronological order: 🧐 🤯 😍

I've been writing a library using Hooks for about three months now, and my final, never-gonna-bother-thinking-further-on-this opinion is that they're amazing, and can enable you to write equally amazing code.

Of course, like anything Alanis Morissette mistakenly considers "irony", something so beautiful can’t exist in this universe without caveats.

In the case of Hooks, those caveats come in the [form of rules](https://reactjs.org/docs/hooks-rules.html#explanation).

Today, I want to talk about one in particular. This one:

> Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.

Personally, when I saw this rule, I could only think one thing:

## Witchcraft!

Why do (what look to be) normal functions have _rules_ around their usage? No loops? No conditions? It must be magic!

Of course, like most magic, it isn't actually magic.

Dan Abramov explains in [more detail on his blog](https://overreacted.io/why-do-hooks-rely-on-call-order/), but the key take-away for us is:

1. React knows which component is being rendered at any given time, therefore:
2. When a Hook is called, it knows which component is calling it, therefore:
3. If we change the calling order of Hooks within a component, React gets confused and breaks, therefore:
4. **If we want to run Hooks within a loop, or conditionally, we need to abstract them into a stand-alone components**.

## Pause for thought

As [Cher](https://twitter.com/codehitchhiker) rightfully points out in [this tweet](https://twitter.com/codehitchhiker/status/1093500712154292224):

> ...you should ask yourself why you're breaking a rule. Is it because there's no way to accomplish what you're trying to do (ie, there's a gap in the ecosystem that needs properly filled?), or is it because you don't understand the reasons for the rules?

Are you breaking the rules to genuinely circumvent a technical limitation? Or is React actually saving you from making a serious mistake?

As [Dan notes](https://twitter.com/dan_abramov/status/1093499692422492161):

> When does conditional state reset? What can state inside of an event possibly mean?

`useState`, to give one example, provides state **for the lifetime of a component**. It doesn't make sense to live inside an inline function:

```jsx
<div
  onClick={() => {
    const [count, setCount] = useState(0);
    // What now motherfucker?
  }}
/>
```

With that said, in this post I want to concentrate on circumventing the purely **technical** limitations of Hooks, in case you run into any of these situations yourself. We're not trying to hack anything, just solve your problems in a genuinely "React" way.

## Running Hooks within a loop

Firing functions within a loop is one of the first things we learn, so the natural impulse is to do the same with Hooks.

Consider the following component:

```jsx
const List = ({ items }) => {
  // Loop over items with .map
  return items.map(item => {
    const ref = useRef({});
    useEffect(() => {
      /* Do something with ref */
    });

    return <li ref={ref}>{item.label}</li>;
  });
};
```

Looks normal, right? Sober. Well I've got news for you buddy. It isn't.

The trouble with the above code isn't that it breaks, it's **that it works**. Even though we're using Hooks within a loop it'll still run just fine on the first render.

If `items` stays in the same order and the same length, it'll actually run "just fine" forever, because the order and number of Hooks that the component fires stays consistent.

But the rule exists because this is way too big an assumption to make. If `items` **does** change in any way, your site or app will break.

### The solution

As I said somewhere in the dark ages of this post, to fix this we need to abstract the loop's contents into a component.

Create a new component, `Item`, that renders out just one of our `item`s:

```jsx
const Item = ({ label }) => {
  const ref = useRef({});
  useEffect(() => {
    /* Do something with ref */
  });

  return <li>{label}</li>;
};
```

Render this `Item` component from the loop:

```jsx
const List = ({ items }) => {
  return items.map(({ label }) => <Item label={label} />);
};
```

Now, the length and order of `items` can change without our code breaking. Whenever `Item` is rendered, React knows its rendering a _different component_, and that information is all it needs to correctly keep track of which Hooks are firing where.

## Running Hooks conditionally

Conditionally firing functions is also one of the first things we learn to do, but you can't with Hooks.

Your instinct, though, tells you to write code like this (apologies for the abstract example):

```jsx
const Component = ({ enable }) => {
  const ref = useRef();

  if (enable) {
    useFunctionality(ref);
  }

  return <div ref={ref} />;
};
```

If `enable` changes, a different number of Hooks are going to be called, and React will throw an error (quite rightfully, you careless charlatan).

### The solution

As before, abstract this Hook into a stand-alone component, this one that just returns `null`:

```jsx
const Functionality = React.forwardRef((props, ref) => {
  useFunctionality(ref);
  return null;
});
```

To call this Hook conditionally, we can now render the `Functionality` component conditionally:

```jsx
const Component = ({ enable }) => {
  const ref = useRef();

  return (
    <>
      {enable && <Functionality ref={ref} />}
      <div ref={ref} />
    </>
  );
};
```

Looking at this, your head might be where mine was when I first realised this method. Your palms are sweaty, probably shaking. You're reaching for the gin to wash away the nascent guilt.

This is a natural reaction. Roll through it, until you realise: This approach is actually legit.

The exact pattern might be slightly novel (although I'm sure it's been done before), but composing functionality using components couldn't _be_ more React.

This method doesn't work with Hooks that return a variable. But it might be of help if you're consuming a third-party Hook, or writing a complex one of your own.

You might be wondering why I didn't make `Functionality` return `children` and use it like this:

```jsx
return (
  <Functionality ref={ref}>
    <div ref={ref} />
  </Functionality>
);
```

That'd also be fine, but it doesn't scale if you're going to have multiple conditional components. Which is admittedly rare, but if you're writing a library that exposes lots of functionality through a single, simple component, this might be something you encounter.

## Running Hooks within a nested function

Seriously? Behave. It's called a "rule" for a reason yeah?

(Although if you're interested, the reason this simply isn't going to work, ever, is that Hooks require knowledge of what component is currently rendering. Stick a Hook in a function and it could get fired at any time - while a different component is rendering, or even while no component is rendering. And if that happens, well...)

## To end

Hooks are special but their rules can sometimes feel like they're limiting your ability to compose complex behaviours.

When you're drunk on Hooks it can be difficult to remember how you did things, even yesterday. But fear not! The traditional React way, composing functionality with components, is still the bedrock of how the framework functions.
