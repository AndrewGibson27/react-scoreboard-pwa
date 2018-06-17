import loadData from '../../store/admin/actions';

export default function criticalFetch(params, { dispatch }) {
  return dispatch(loadData());
}
