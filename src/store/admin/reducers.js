const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FOO':
      return { data: action.data };
    default:
      return state;
  }
};
