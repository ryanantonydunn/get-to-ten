import React from "react";
import styled from "styled-components";
import { default as Options } from "./OptionsContainer";

const Board = styled.div`
  width: 300px;
  height: 300px;
  background: red;
`;

const Game = ({ board, pause, touchBoard, setGameState, testAction }) => (
  <div>
    Game
    <br />
    <Board
      onClick={() => {
        touchBoard(1, 2);
      }}
    >
      Boardy boi
      <br />
      {pause ? "paused" : "not paused"}
    </Board>
    <button
      onClick={() => {
        testAction();
      }}
    >
      Trigger Alert
    </button>
    <Options text="setting more props" />
  </div>
);

export default Game;
