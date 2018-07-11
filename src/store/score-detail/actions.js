import axios from 'axios';

import ScoreDetailQuery from './queries';

const API_URL = 'http://localhost:3000/graphql';

export default function getScoreDetail(id) {
  return (dispatch) => {
    dispatch({ type: 'SET_SCORE_DETAIL_LOADING' });

    return axios.post(API_URL, {
      query: ScoreDetailQuery,
      variables: { id },
    }).then(({ data: { data: { gameById } } }) => {
      dispatch({
        type: 'SET_SCORE_DETAIL_COMPLETE',
        data: gameById,
      });
    }).catch(() => {
      dispatch({ type: 'SET_SCORE_DETAIL_ERROR' });
    });
  };
}
