export default board => {
  if (!board) {
    return true;
  }
  let gameOver = true;
  const gameOverCellMatch = (x, y, value) => {
    const match = (x, y) => {
      if (board[x] && board[x][y] && board[x][y].value === value) {
        gameOver = false;
      }
    };
    match(x + 1, y);
    match(x - 1, y);
    match(x, y + 1);
    match(x, y - 1);
  };
  board.forEach((col, x) => {
    col.forEach((cell, y) => {
      gameOverCellMatch(x, y, cell.value);
    });
  });
  return gameOver;
};
