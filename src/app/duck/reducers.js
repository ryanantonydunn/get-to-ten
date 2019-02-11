const INITIAL_STATE = {
  alert: {
    active: false,
    text: "",
    callback: null
  },
  options: {
    size: 6
  },
  active: false,
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
        board: [...action.board]
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
