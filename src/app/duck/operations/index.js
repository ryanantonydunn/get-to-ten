import { Creators } from "../actions";
import startNewGame from "./startNewGame";
import touchBoard from "./touchBoard";

const { setOptions } = Creators;

export default {
  touchBoard,
  startNewGame,
  setOptions
};
