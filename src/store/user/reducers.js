const initialState = {
  data: {},
  isLoading: false,
  didError: false,
  isFinished: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_LOADING':
      return {
        ...state,
        isLoading: true,
        didError: false,
        isFinished: false,
      };
    case 'SET_USER_COMPLETE':
      return {
        ...state,
        isLoading: false,
        didError: false,
        isFinished: true,
        data: action.data,
      };
    case 'SET_USER_ERROR':
      return {
        ...state,
        isLoading: false,
        didError: true,
        isFinished: true,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
