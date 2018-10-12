import axios from 'axios';

import UserQuery from './queries';

const API_URL = 'http://localhost:3000/graphql';

export default function getUser(httpClient) {
  const clientToUse = httpClient || axios;

  return (dispatch) => {
    dispatch({ type: 'SET_USER_LOADING' });

    return clientToUse.post(API_URL, {
      query: UserQuery,
    }).then(({ data: { data: { user } } }) => {
      dispatch({
        type: 'SET_USER_LOGGED_IN',
        data: user,
      });
    }).catch(() => {
      dispatch({ type: 'SET_USER_LOGGED_OUT' });
    });
  };
}
