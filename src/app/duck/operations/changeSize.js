import { Creators } from "../actions";
import { getStoredData } from "../../../helpers";
const { setSize } = Creators;

export default size => {
  return dispatch => {
    const data = getStoredData(size);
    dispatch(setSize(data.board, data.score, data.topScore, size));
  };
};
