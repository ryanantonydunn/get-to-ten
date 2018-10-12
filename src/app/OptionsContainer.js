import { connect } from "react-redux";
import Options from "./Options";
import { mainOperations } from "./duck";

const mapStateToProps = state => {
  const { options } = state.main;
  return { options };
};

const mapDispatchToProps = dispatch => {
  return {
    setOption: option => {
      dispatch(mainOperations.changeOption(option));
    },
    setGameState: active => {
      dispatch(mainOperations.setGameState(active));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
