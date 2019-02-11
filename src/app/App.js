import React from "react";
import styled from "styled-components";

import { default as Game } from "./GameContainer";
import { default as Options } from "./OptionsContainer";

const Wrapper = styled.div`
  --block: 4px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-content: center;
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 600px;
  background: #111;
  border: var(--block) solid #2c2c2c;
  * {
    user-select: none;
  }
`;

const App = ({ active }) => {
  return <Wrapper>{active ? <Game /> : <Options />}</Wrapper>;
};

export default App;
