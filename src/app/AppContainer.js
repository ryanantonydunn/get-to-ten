import { connect } from "react-redux";
import App from "./App";

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
