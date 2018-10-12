import { createActions } from "reduxsauce";

const { Creators, Types } = createActions({
  setAlert: ["text", "callback"],
  closeAlert: [],
  setBoard: ["board"],
  setOption: ["option"],
  setGameState: ["active"],
  setPauseState: ["pause"]
});

export { Creators, Types };
