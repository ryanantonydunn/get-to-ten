import { Creators } from "../actions";
import touchBoard from "./touchBoard";
import changeSize from "./changeSize";
import startNewGame from "./startNewGame";

const { setBoard, startGame, openSettings } = Creators;

export default {
  setBoard,
  touchBoard,
  changeSize,
  startNewGame,
  startGame,
  openSettings
};
