import React from "react";
import { useLayoutEffect, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { Example } from "..";
import { siteTheme } from "../../components/themes";

export function Distorted() {
  const controls = useAnimation();
  const isInitialRender = useRef(true);
  const [isBig, setIsBig] = useState(false);

  useLayoutEffect(() => {
    controls.start({
      scale: 1,
      transition: !isInitialRender.current
        ? { duration: 2, ease: "easeInOut" }
        : { type: false },
    });
    isInitialRender.current = false;
  }, [controls, isBig]);

  return (
    <Example>
      <Box
        animate={controls}
        style={{ scale: isBig ? 0.25 : 4 }}
        isBig={isBig}
        onClick={() => setIsBig(!isBig)}
      >
        <Child />
      </Box>
    </Example>
  );
}

export function Undistorted() {
  const [isBig, setIsBig] = useState(false);

  return (
    <Example>
      <Box
        animate
        transition={{ duration: 2, ease: "easeInOut" }}
        isBig={isBig}
        onClick={() => setIsBig(!isBig)}
      >
        <Child animate transition={{ duration: 2, ease: "easeInOut" }} />
      </Box>
    </Example>
  );
}

export function Independent() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  /**
   * `magicDependency` is currently an internal
   * API only deployed here to stop the looping animation
   * changing during hot reloads
   */
  return (
    <Example>
      <Container
        animate
        magicDependency={isOpen}
        transition={{ duration: 2, ease: "easeInOut", yoyo: Infinity }}
        isOpen={isOpen}
      >
        <Ball
          animate
          magicDependency={isOpen}
          transition={{ duration: 3, ease: "easeInOut", yoyo: Infinity }}
        />
      </Container>
    </Example>
  );
}

export function IndependentBroken() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  /**
   * `magicDependency` is currently an internal
   * API only deployed here to stop the looping animation
   * changing during hot reloads
   */
  return (
    <Example>
      <Container
        animate
        magicDependency={isOpen}
        transition={{ duration: 2, ease: "easeInOut", yoyo: Infinity }}
        isOpen={isOpen}
      >
        <Ball
          magicDependency={isOpen}
          transition={{ duration: 3, ease: "easeInOut", yoyo: Infinity }}
        />
      </Container>
    </Example>
  );
}

const Container = styled(motion.div)`
  background-color: #eeeeee;
  border-radius: 25px;
  margin: 0;
  padding: 20px;

  ${({ isOpen }) => isOpen && `width: 80%`}
`;

const Ball = styled(motion.div)`
  background: #f5148c;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const Box = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 30px;
  background: #ddd;
  padding: 10px;

  ${({ isBig }) =>
    isBig &&
    `
      width: 400px;
      height: 400px;
    `}
`;

const Child = styled(motion.div)`
  background-color: ${siteTheme.secondary};
  width: 50px;
  height: 50px;
  border-radius: 20px;
`;
