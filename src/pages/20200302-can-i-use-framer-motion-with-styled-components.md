---
title: Can I use Framer Motion with Styled Components?
description: "Framer Motion is fully compatible with Styled Components. Take a look at how simple the two work together."
author: mattperry
date: "20200302"
---

Framer Motion is fully compatible with Styled Components.

Both Styled Components and Framer Motion offer ways to make custom styled and animated components.

## 1. styled (recommended)

Styled Components' `styled` function can be used to style any component, including Framer Motion's `motion`:

```jsx
import styled from "styled-components";
import { motion } from "framer-motion";

const Box = styled(motion.div)`
  background: white;
  width: 150px;
  height: 150px;
`;
```

The component returned from `styled(motion.div)` can then be be used just like any other `motion` component:

```jsx
<Box animate={{ scale: 2 }} />
```

## 2. motion.custom

Framer Motion comes with a way to turn normal React components into animated version of themselves, the `motion.custom` function.

As long as a component uses `React.forwardRef` to forward its `ref` prop to the underlying HTML element, it can be animated.

This works well for most components but with Styled Components I prefer the syntax of having the CSS template on the outside of the function call, as this looks a bit messy:

```jsx
const Box = motion.custom(styled.div`
  background: white;
  width: 150px;
  height: 150px;
`);
```

## Live demo

Play around with this live demo to get a feel of how to use Framer Motion with Styled Components. It features examples of how to use both `styled` and `motion.custom`:

<iframe
    src="https://codesandbox.io/embed/condescending-bhaskara-ge2gp?fontsize=14&hidenavigation=1&module=%2Fsrc%2FExample.tsx&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="Framer Motion with Styled Components example"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
