import { connect } from "react-redux";
import Game from "./Game";
import { mainOperations } from "./duck";

const mapStateToProps = state => {
  const { pause, board } = state.main;
  return { pause, board };
};

const mapDispatchToProps = dispatch => {
  return {
    touchBoard: (x, y) => {
      dispatch(mainOperations.touchBoard(x, y));
    },
    setGameState: active => {
      dispatch(mainOperations.setGameState(active));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
