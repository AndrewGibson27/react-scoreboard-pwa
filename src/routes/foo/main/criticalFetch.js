import loadData from '../../../store/bar/actions';

export default function (params, { dispatch }) {
  return dispatch(loadData());
}
