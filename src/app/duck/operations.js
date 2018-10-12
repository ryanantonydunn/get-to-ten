import { Creators } from "./actions";

const { setPauseState, setGameState, setAlert, closeAlert } = Creators;

const testAction = () => {
  return dispatch => {
    dispatch(
      setAlert("are you sure?", () => {
        dispatch(setAlert("balls"));
      })
    );
  };
};

const touchBoard = (x, y) => {
  return dispatch => {
    dispatch(setPauseState(true));
    // dispatch(setBoard(["touched"]));
    setTimeout(() => {
      dispatch(setPauseState(false));
    }, 1000);
  };
};

export default {
  touchBoard,
  setGameState,
  setAlert,
  closeAlert,
  testAction
};
