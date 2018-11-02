import { Creators } from "../actions";

const { startGame } = Creators;

const rand = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
};

const startNewGame = options => {
  return dispatch => {
    const { max, rows, cols } = options;
    const board = [];
    for (let x = 0; x < cols; x++) {
      board[x] = [];
      for (let y = 0; y < rand(Math.max(0, rows - 5), rows); y++) {
        board[x].push({
          value: rand(Math.max(0, max - 3), max),
          removing: false,
          adding: false
        });
      }
    }
    dispatch(startGame(board));
  };
};

export default startNewGame;
