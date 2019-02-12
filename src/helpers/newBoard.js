import isGameOver from "./isGameOver";
const Random = require("random-js")();

const newBoard = size => {
  const max = size < 4 ? 2 : size > 5 ? 4 : 3;
  const board = [];
  for (let x = 0; x < size; x++) {
    board[x] = [];
    for (let y = 0; y < size; y++) {
      board[x].push({
        yOffset: 0,
        value: Random.integer(1, max)
      });
    }
  }
  return board;
};

export default size => {
  let board,
    i = 0;
  while (isGameOver(board) && i < 100) {
    i++;
    board = newBoard(size);
  }
  return board;
};
