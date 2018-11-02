import { connect } from "react-redux";
import Options from "./Options";
import { mainOperations } from "./duck";

const mapStateToProps = state => {
  const { options } = state.main;
  return { options };
};

const mapDispatchToProps = dispatch => {
  return {
    setOptions: option => {
      dispatch(mainOperations.setOptions(option));
    },
    startNewGame: options => {
      dispatch(mainOperations.startNewGame(options));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
