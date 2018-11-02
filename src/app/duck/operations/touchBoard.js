import { Creators } from "../actions";

const { setBoard, unPauseGame } = Creators;

const ANIM_TIME = 400;

// player has touched the board
const touchBoard = (x, y, board, rows) => {
  return dispatch => {
    const value = board[x][y].value;
    if (value < 1) {
      return;
    }

    // map out effects of the move
    const checkedCells = { [x + "-" + y]: true };
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

      // actually remove the cells
      setTimeout(() => {
        wave.forEach(cell => {
          changingBoard[cell.x].splice(cell.y, 1);
        });
        dispatch(setBoard(changingBoard));
      }, wait + ANIM_TIME);
    });

    // unpause the gameplay
    const pauseTime = removeCellWaves.length * 100 + ANIM_TIME + 200;
    setTimeout(() => {
      dispatch(unPauseGame());
    }, pauseTime);
  };
};

export default touchBoard;
