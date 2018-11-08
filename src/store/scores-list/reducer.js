const initialState = { data: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCORES_LIST_DATA':
      return { ...state, data: action.data };
    default:
      return state;
  }
};
