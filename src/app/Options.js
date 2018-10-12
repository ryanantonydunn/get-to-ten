import React from "react";
import styled from "styled-components";

const Howdy = styled.div``;

const Options = ({ options, setGameState, text }) => (
  <div>
    Options
    <br />
    {text}
    <br />
    <button
      onClick={() => {
        setGameState(true);
      }}
    >
      Start Game
    </button>
    <Howdy />
  </div>
);

export default Options;
