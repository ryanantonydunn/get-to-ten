import newBoard from "./newBoard";

export default size => {
  let storedBoard = localStorage.getItem("board-" + size);
  let board;
  if (storedBoard) {
    storedBoard = JSON.parse(storedBoard);
    board = storedBoard.map(col => {
      return col.map(value => {
        return { yOffset: 0, value };
      });
    });
  } else {
    board = newBoard(size);
  }
  return {
    topScore: localStorage.getItem("topScore-" + size) || 0,
    score: localStorage.getItem("score-" + size) || 0,
    board
  };
};
