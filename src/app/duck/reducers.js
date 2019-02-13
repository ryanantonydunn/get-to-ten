import { getStoredData } from "../../helpers";

const size = localStorage.getItem("size") || 4;
const data = getStoredData(size);

const INITIAL_STATE = {
  size,
  active: false,
  gameOver: false,
  ...data
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_GAME": {
      return {
        ...state,
        active: true
      };
    }
    case "NEW_GAME": {
      return {
        ...state,
        board: action.board,
        score: 0,
        active: true,
        gameOver: false
      };
    }
    case "OPEN_SETTINGS": {
      return {
        ...state,
        active: false
      };
    }
    case "SET_BOARD": {
      return {
        ...state,
        board: [...action.board]
      };
    }
    case "TOUCH_ACTION": {
      return {
        ...state,
        board: [...action.board],
        score: action.score,
        topScore: action.topScore,
        gameOver: action.gameOver
      };
    }
    case "SET_SIZE": {
      return {
        ...state,
        board: [...action.board],
        score: action.score,
        topScore: action.topScore,
        size: action.size
      };
    }
    default:
      return state;
  }
};

export default reducers;
