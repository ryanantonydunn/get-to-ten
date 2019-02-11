import { Creators } from "../actions";
const Random = require("random-js")();

const { setBoard } = Creators;

// player has touched the board
const touchBoard = (x, y, board) => {
  return dispatch => {
    const value = board[x][y].value;
    const checkedCells = { [x + "-" + y]: true };
    const removeCells = {};
    let success = false;

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
        newCol.unshift({ value: Random.integer(1, 3), yOffset: offset });
      }
      newBoard[x] = newCol;
    });

    // dispatch the new boards
    dispatch(setBoard(newBoard));
  };
};

export default touchBoard;
