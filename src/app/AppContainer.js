import { connect } from "react-redux";
import App from "./App";
import { default as mainOperations } from "./duck";

const mapStateToProps = state => {
  return { active: state.main.active };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
