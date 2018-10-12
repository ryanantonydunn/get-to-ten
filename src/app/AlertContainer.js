import { connect } from "react-redux";
import Alert from "./Alert";
import { mainOperations } from "./duck";

const mapStateToProps = state => {
  return { ...state.main.alert };
};

const mapDispatchToProps = dispatch => {
  return {
    closeAlert: () => {
      dispatch(mainOperations.closeAlert());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert);
