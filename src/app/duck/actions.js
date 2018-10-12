import { createActions } from "reduxsauce";

const { Creators, Types } = createActions({
  setBoard: ["board"],
  setOption: ["option"],
  setGameState: ["active"],
  setPauseState: ["pause"]
});

export { Creators, Types };
