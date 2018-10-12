import React from "react";
import styled from "styled-components";
import { default as Options } from "./OptionsContainer";

const Game = ({ board, pause, touchBoard, setGameState }) => (
  <div>
    Game
    <br />
    <Options text="setting more props" />
  </div>
);

export default Game;
