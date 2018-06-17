const initialState = { error: false, loading: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: true, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true, error: false };
    case 'SET_READY':
      return initialState;
    default:
      return state;
  }
};
