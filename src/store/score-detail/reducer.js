const initialState = {
  data: {},
  isLoading: false,
  didError: false,
  isFinished: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCORE_DETAIL_LOADING':
      return {
        ...state,
        isLoading: true,
        didError: false,
        isFinished: false,
      };
    case 'SET_SCORE_DETAIL_COMPLETE':
      return {
        ...state,
        isLoading: false,
        didError: false,
        isFinished: true,
        data: action.data,
      };
    case 'SET_SCORE_DETAIL_ERROR':
      return {
        ...state,
        isLoading: false,
        didError: true,
        isFinished: true,
      };
    default:
      return state;
  }
};
