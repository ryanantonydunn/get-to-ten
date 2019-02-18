import { createActions } from "reduxsauce";

const { Creators, Types } = createActions({
  startGame: [],
  carryOn: [],
  newGame: ["board"],
  openSettings: [],
  setBoard: ["board"],
  touchAction: ["board", "score", "topScore", "won"],
  setSize: ["board", "score", "topScore", "size"]
});

export { Creators, Types };
