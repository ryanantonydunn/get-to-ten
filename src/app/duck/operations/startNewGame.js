import { Creators } from "../actions";
const Random = require("random-js")();

const { startGame } = Creators;

const startNewGame = options => {
  return dispatch => {
    const { max, rows, cols } = options;
    const board = [];
    for (let x = 0; x < cols; x++) {
      board[x] = [];
      for (let y = 0; y < Random.integer(Math.max(0, rows - 5), rows); y++) {
        board[x].push({
          value: Random.integer(Math.max(0, max - 2), max),
          removing: false,
          adding: false
        });
      }
    }
    dispatch(startGame(board));
  };
};

export default startNewGame;
