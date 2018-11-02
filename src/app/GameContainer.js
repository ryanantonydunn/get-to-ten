import { connect } from "react-redux";
import Game from "./Game";
import { mainOperations } from "./duck";

const mapStateToProps = state => {
  const { board, options } = state.main;
  const { rows } = options;
  console.log(state);
  return { board, rows, pause: false };
};

const mapDispatchToProps = dispatch => {
  return {
    touchBoard: (x, y, board, rows) => {
      dispatch(mainOperations.touchBoard(x, y, board, rows));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
