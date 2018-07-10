import axios from 'axios';

import ScoresListQuery from './queries';

const API_URL = 'http://localhost:3000/graphql';

export default function getScoresRibbon() {
  return dispatch => (
    axios.post(API_URL, {
      query: ScoresListQuery,
    }).then(({ data: { data: { allGames } } }) => {
      dispatch({
        type: 'SET_SCORES_RIBBON_DATA',
        data: allGames,
      });
    })
  );
}
