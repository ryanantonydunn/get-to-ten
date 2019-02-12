import { Creators } from "../actions";
import touchBoard from "./touchBoard";
import changeSize from "./changeSize";
import startNewGame from "./startNewGame";

const { startGame, openSettings } = Creators;

export default {
  touchBoard,
  changeSize,
  startNewGame,
  startGame,
  openSettings
};
