import { Creators } from "../actions";
import { isGameOver } from "../../../helpers";
const Random = require("random-js")();

const { touchAction } = Creators;

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
    newBoard[x][y].value += 1;
    const areWeHittingTen = newBoard[x][y].value === 10;
    let didWeHitTenAlready = false;
    newBoard.forEach((col, x1) => {
      const newCol = [...col];
      let newCells = 0;
      for (let y1 = col.length - 1; y1 >= 0; y1--) {
        const notTheSameCell = !(x1 === x && y1 === y);
        if (notTheSameCell && newBoard[x1][y1].value >= 10) {
          didWeHitTenAlready = true;
        }
        if (removeCells[x1 + "-" + y1]) {
          newCol.splice(y1, 1);
          newCells++;
        }
      }
      for (let i = 0; i < newCells; i++) {
        let yOffset = newCol[0] ? newCol[0].yOffset + 1 : 0;
        yOffset = Math.max(yOffset, size);
        newCol.unshift({ value: Random.integer(1, max), yOffset });
      }
      newBoard[x1] = newCol;
    });

    // are we game overed
    let gameOver = isGameOver(newBoard);

    // did we just win
    const won = areWeHittingTen && !didWeHitTenAlready;

    // set score
    const newScore = parseInt(score) + scoreAdd * newBoard[x][y].value;
    const newTopScore = Math.max(newScore, topScore);
    localStorage.setItem("score-" + size, gameOver ? 0 : newScore);
    localStorage.setItem("topScore-" + size, newTopScore);

    // save board
    const saveBoard = newBoard.map(col => {
      return col.map(cell => cell.value);
    });
    localStorage.setItem("board-" + size, JSON.stringify(saveBoard));

    // dispatch the new board
    dispatch(touchAction(newBoard, newScore, newTopScore, won));
  };
};

export default touchBoard;
