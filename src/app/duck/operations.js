import { Creators } from "./actions";

const { setBoard, setPauseState, setGameState } = Creators;

const touchBoard = (x, y) => {
  return dispatch => {
    dispatch(setPauseState(true));
    let time = 1000;
    dispatch(setBoard(["touched"]));
    setTimeout(() => {
      dispatch(setPauseState(false));
    }, time);
  };
};

export default {
  touchBoard,
  setGameState
};
