import { Creators } from "../actions";
import { isGameOver } from "../../../helpers";
const Random = require("random-js")();

const { setBoard } = Creators;

// player has touched the board
const touchBoard = (x, y, board, size, score, topScore) => {
  return dispatch => {
    const max = size < 4 ? 2 : size > 5 ? 4 : 3;
    const value = board[x][y].value;
    const checkedCells = { [x + "-" + y]: true };
    const removeCells = {};
    let success = false;
    let scoreAdd = 2;

    // check the adjacent cells to a cell
    const checkAdjacentCells = (x, y) => {
      const newCellsInThisDepth = [];
      const cellMatch = (x, y) => {
        const key = x + "-" + y;
        if (checkedCells[key]) {
          return;
        }
        checkedCells[key] = true;
        if (board[x] && board[x][y] && board[x][y].value === value) {
          newCellsInThisDepth.push({ x, y });
          removeCells[key] = true;
          success = true;
          scoreAdd++;
        }
      };
      cellMatch(x + 1, y);
      cellMatch(x - 1, y);
      cellMatch(x, y + 1);
      cellMatch(x, y - 1);

      // recurse the function until there are no more matches
      newCellsInThisDepth.forEach(cell => {
        checkAdjacentCells(cell.x, cell.y);
      });
    };
    checkAdjacentCells(x, y);

    // are we not doing any work
    if (!success) {
      return;
    }

    // prep the new board with offsets on new cells
    const newBoard = JSON.parse(JSON.stringify(board));
    let maxOffset = 0;
    newBoard[x][y].value += 1;
    newBoard.forEach((col, x) => {
      const newCol = [...col];
      let offset = 0;
      for (let y = col.length - 1; y >= 0; y--) {
        newCol.yOffset = 0;
        if (removeCells[x + "-" + y]) {
          newCol.splice(y, 1);
          offset++;
        } else {
          newCol[y].yOffset = offset;
        }
      }
      maxOffset = Math.max(offset, maxOffset);
      for (let i = 0; i < offset; i++) {
        newCol.unshift({ value: Random.integer(1, max), yOffset: offset });
      }
      newBoard[x] = newCol;
    });

    // are we game overed
    let gameOver = isGameOver(newBoard);

    // set score
    const newScore =
      parseInt(score) +
      Math.ceil(Math.pow(scoreAdd * 0.5, newBoard[x][y].value) * 0.5);
    const newTopScore = Math.max(newScore, topScore);
    localStorage.setItem("score-" + size, gameOver ? 0 : newScore);
    localStorage.setItem("topScore-" + size, newTopScore);

    // save board
    const saveBoard = newBoard.map(col => {
      return col.map(cell => cell.value);
    });
    localStorage.setItem("board-" + size, JSON.stringify(saveBoard));

    // dispatch the new board
    dispatch(setBoard(newBoard, newScore, newTopScore, gameOver));
  };
};

export default touchBoard;
