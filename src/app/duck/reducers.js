const INITIAL_STATE = {
  alert: {
    active: false,
    text: "",
    callback: null
  },
  options: {
    cols: 10,
    rows: 10,
    max: 9
  },
  active: false,
  pause: false,
  board: []
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_GAME": {
      return {
        ...state,
        board: [...action.board],
        active: true
      };
    }
    case "SET_BOARD": {
      return {
        ...state,
        board: [...action.board],
        pause: true
      };
    }
    case "UN_PAUSE_GAME": {
      return {
        ...state,
        pause: false
      };
    }
    case "SET_OPTIONS": {
      const { option } = action;
      return {
        ...state,
        options: {
          ...state.options,
          ...option
        }
      };
    }
    default:
      return state;
  }
};

export default reducers;
