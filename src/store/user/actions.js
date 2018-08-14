import axios from 'axios';

import LogInMutation from './mutations';

const API_URL = 'http://localhost:3000/graphql';

export default function logIn(input) {
  return (dispatch) => {
    dispatch({ type: 'SET_USER_LOADING' });

    return axios.post(API_URL, {
      mutation: LogInMutation,
      variables: { input },
    }).then(({ data: { data: { user } } }) => {
      dispatch({
        type: 'SET_USER_COMPLETE',
        data: user,
      });
    }).catch(() => {
      dispatch({
        type: 'SET_USER_ERROR',
        errorMessage: 'foobar',
      });
    });
  };
}
