const initialState = {
  error: false,
  message: '',
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        error: true,
        message: action.message,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        error: false,
        errorMessage: '',
        loading: true,
      };
    case 'SET_READY':
      return initialState;
    default:
      return state;
  }
};
