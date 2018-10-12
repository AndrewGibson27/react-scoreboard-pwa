import getUser from '../store/user/actions';
import createHttpClient from '../utils/httpClient';

export default function doInitialDispatches(store, req) {
  const httpClient = createHttpClient(req);
  return store.dispatch(getUser(httpClient));
}
