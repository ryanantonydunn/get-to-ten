import { Creators } from "../actions";
const Random = require("random-js")();

const { startGame } = Creators;

const startNewGame = options => {
  return dispatch => {
    const { size } = options;
    const board = [];
    for (let x = 0; x < size; x++) {
      board[x] = [];
      for (let y = 0; y < size; y++) {
        board[x].push({
          yOffset: 0,
          value: Random.integer(1, 3)
        });
      }
    }
    dispatch(startGame(board));
  };
};

export default startNewGame;
