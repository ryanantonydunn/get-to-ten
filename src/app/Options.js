import React from "react";
import styled from "styled-components";

const Howdy = styled.div``;

const Options = ({ options, startNewGame, text }) => (
  <div>
    <h2>Options</h2>
    <br />
    {text}
    <br />
    <button
      onClick={() => {
        startNewGame(options);
      }}
    >
      Start Game
    </button>
    <Howdy />
  </div>
);

export default Options;
