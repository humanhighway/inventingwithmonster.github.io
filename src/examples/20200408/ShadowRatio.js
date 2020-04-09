import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Example } from "../";

export function ShadowRatio() {
  const [isBig, setIsBig] = useState(false);

  return (
    <Example>
      <Box
        animate
        transition={{ duration: 2, ease: "easeInOut" }}
        isBig={isBig}
        onClick={() => setIsBig(!isBig)}
      />
    </Example>
  );
}

const Box = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  ${({ isBig }) =>
    isBig &&
    `
      width: 90%;
    `}
`;
