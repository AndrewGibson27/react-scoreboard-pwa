import loadData from '../../../store/baz/actions';

export default function (params, { dispatch }) {
  return dispatch(loadData());
}
