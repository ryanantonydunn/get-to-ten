import { createActions } from "reduxsauce";

const { Creators, Types } = createActions({
  startGame: ["board"],
  setBoard: ["board", "pause"],
  unPauseGame: [],
  setOptions: ["option"]
});

export { Creators, Types };
