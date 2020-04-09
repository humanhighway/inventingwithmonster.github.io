import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Example } from "..";

const Container = styled(motion.div)`
  width: 170px;
  height: 100px;
  border-radius: 100px;
  padding: 10px;
  display: flex;
  cursor: pointer;

  ${({ isOn }) =>
    isOn
      ? `
    background-color: #1fedcb;
    justify-content: flex-end;
  `
      : `
    background-color: #dddddd;
    justify-content: flex-start;
  `}
`;

const Handle = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 200px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.02);
`;

export function Switch({ animations = true }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <Example>
      <Container
        animate={animations || undefined}
        onClick={() => setIsOn(!isOn)}
        isOn={isOn}
      >
        <Handle animate={animations || undefined} />
      </Container>
    </Example>
  );
}
