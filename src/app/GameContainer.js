import { connect } from "react-redux";
import Game from "./Game";
import { mainOperations } from "./duck";

const mapStateToProps = state => {
  const { board, options } = state.main;
  const pause = !!board.find(col => col.find(cell => cell.removing));
  return { board, options, pause };
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
