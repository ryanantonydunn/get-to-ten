import { combineReducers } from "redux";
import { default as mainReducer } from "./app/duck/reducers";

const rootReducer = combineReducers({
  main: mainReducer
});

export default rootReducer;
