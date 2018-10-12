import React from "react";
import styled from "styled-components";

import { default as Game } from "./GameContainer";
import { default as Options } from "./OptionsContainer";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #222239;
  text-align: center;
  color: #fff;
`;

const App = ({ active }) => {
  return <Wrapper>{active ? <Game /> : <Options />}</Wrapper>;
};

export default App;
