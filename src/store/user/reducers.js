const initialState = {
  data: {},
  isLoading: false,
  isLoggedIn: false,
  isFinished: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_USER_LOGGED_IN':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        isFinished: true,
        data: action.data,
      };
    case 'SET_USER_LOGGED_OUT':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        isFinished: true,
      };
    default:
      return state;
  }
};
