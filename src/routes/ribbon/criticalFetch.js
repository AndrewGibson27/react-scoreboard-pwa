import getScoresRibbon from '../../store/scores-ribbon/actions';

export default function criticalFetch(route, { dispatch }) {
  return dispatch(getScoresRibbon());
}
