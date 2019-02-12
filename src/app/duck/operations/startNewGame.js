import { Creators } from "../actions";
import { newBoard } from "../../../helpers";
const { newGame } = Creators;

export default size => {
  return dispatch => {
    const board = newBoard(size);
    const saveBoard = board.map(col => {
      return col.map(cell => cell.value);
    });
    localStorage.setItem("board-" + size, JSON.stringify(saveBoard));
    localStorage.setItem("score-" + size, 0);
    dispatch(newGame(board));
  };
};
