import isGameOver from "./isGameOver";
const Random = require("random-js")();

const newBoard = size => {
  const newNumMax = size < 4 ? 4 : size > 5 ? 4 : 3;
  const newNumMin = size < 4 ? 3 : 1;
  const board = [];
  for (let x = 0; x < size; x++) {
    board[x] = [];
    for (let y = 0; y < size; y++) {
      board[x].push({
        yOffset: size - y - 1,
        value: Random.integer(newNumMin, newNumMax)
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
