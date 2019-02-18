import { connect } from "react-redux";
import App from "./App";
import { mainOperations } from "./duck";
import { isGameOver } from "../helpers";

const mapStateToProps = state => {
  const gameOver = isGameOver(state.main.board);
  return { ...state.main, gameOver };
};

const mapDispatchToProps = dispatch => {
  return {
    setBoard: board => {
      dispatch(mainOperations.setBoard(board));
    },
    touchBoard: (x, y, board, size, score, topScore) => {
      dispatch(mainOperations.touchBoard(x, y, board, size, score, topScore));
    },
    changeSize: size => {
      dispatch(mainOperations.changeSize(size));
    },

    startGame: () => {
      dispatch(mainOperations.startGame());
    },
    startNewGame: size => {
      dispatch(mainOperations.startNewGame(size));
    },
    openSettings: () => {
      dispatch(mainOperations.openSettings());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
