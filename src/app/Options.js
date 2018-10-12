import React from "react";
import styled from "styled-components";

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
  </div>
);

export default Options;
