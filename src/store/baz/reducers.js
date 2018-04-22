const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BAZ':
      return { data: action.data };
    default:
      return state;
  }
};
