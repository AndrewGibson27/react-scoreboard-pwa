import getScoresList from '../../store/scores-list/actions';

export default function criticalFetch(route, { dispatch }) {
  return dispatch(getScoresList());
}
