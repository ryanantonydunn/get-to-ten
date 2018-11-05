import { Creators } from "../actions";
const Random = require("random-js")();

const { setBoard } = Creators;

// player has touched the board
const touchBoard = (x, y, board, options) => {
  return dispatch => {
    const { max, rows } = options;
    const value = board[x][y].value;
    if (value < 1) {
      return;
    }

    // map out effects of the move
    const checkedCells = { [x + "-" + y]: true };
    const removeCells = [];
    const removeCellWaves = [];
    let success = false;
    const checkAdjacentCells = (x, y, depth) => {
      const newCells = [];
      const cellMatch = (x, y) => {
        const key = x + "-" + y;
        if (checkedCells[key]) {
          return;
        }
        checkedCells[key] = true;
        if (board[x] && board[x][y] && board[x][y].value === value) {
          if (!removeCellWaves[depth]) {
            removeCellWaves[depth] = [];
          }
          removeCellWaves[depth].push({ x, y });
          removeCells.push({ x, y });
          newCells.push({ x, y });
          success = true;
        }
      };

      // check up and down cells
      cellMatch(x, y - 1);
      cellMatch(x, y + 1);

      // check left and right cells
      const offsetMiddleY = rows - board[x].length;
      if (board[x - 1]) {
        const offsetLeftY = rows - board[x - 1].length;
        cellMatch(x - 1, y + offsetMiddleY - offsetLeftY);
      }
      if (board[x + 1]) {
        const offsetRightY = rows - board[x + 1].length;
        cellMatch(x + 1, y + offsetMiddleY - offsetRightY);
      }

      // recurse the function until there are no more matches
      newCells.forEach(coords => {
        checkAdjacentCells(coords.x, coords.y, depth + 1);
      });
    };
    checkAdjacentCells(x, y, 0);

    // are we not doing any work
    if (!success) {
      return;
    }

    // decrease the value of the cell
    const changingBoard = [...board];
    changingBoard[x][y].value -= 1;
    dispatch(setBoard(changingBoard));

    // set the waves
    removeCellWaves.forEach((wave, i) => {
      const wait = i * 100 + 20;
      const changingBoard = [...board];

      // sort wave
      const sortedWave = wave.sort(function(a, b) {
        return b.y - a.y;
      });

      // start the animations
      setTimeout(() => {
        sortedWave.forEach(cell => {
          changingBoard[cell.x][cell.y] = {
            ...board[cell.x][cell.y],
            removing: true
          };
        });
        dispatch(setBoard(changingBoard));
      }, wait);
    });

    // complete the move
    const pauseTime = removeCellWaves.length * 100 + 100;
    setTimeout(() => {
      const newBoard = [...board];

      // remove the cells
      const sortedCells = removeCells.sort(function(a, b) {
        return b.y - a.y;
      });
      sortedCells.forEach(coords => {
        newBoard[coords.x].splice(coords.y, 1);
      });

      // add new cells
      newBoard.forEach((col, x) => {
        if (col.length < rows) {
          if (Random.integer(0, 1)) {
            newBoard[x].unshift({
              value: Random.integer(Math.max(0, max - 2), max),
              removing: false,
              adding: true
            });
          }
        }
      });

      dispatch(setBoard(newBoard));
    }, pauseTime);
  };
};

export default touchBoard;
