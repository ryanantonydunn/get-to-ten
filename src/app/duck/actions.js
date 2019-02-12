import { createActions } from "reduxsauce";

const { Creators, Types } = createActions({
  startGame: [],
  newGame: ["board"],
  openSettings: [],
  setBoard: ["board", "score", "topScore", "gameOver"],
  setSize: ["board", "score", "topScore", "size"]
});

export { Creators, Types };
