/* global document, window */

import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';

import App from '../App'; // eslint-disable-line
import configureStore from '../utils/configureStore';
import getDataFetchers from '../utils/getDataFetchers';
import getMatchedRoutes from '../utils/getMatchedRoutes';
import { setLoading, setReady } from '../store/context/actions';

const history = createHistory();
const store = configureStore(window.INITIAL_STATE);
window.PREVIOUS_PATHNAME = window.location.pathname;

history.listen((location) => {
  const { pathname } = location;
  const prevMatched = getMatchedRoutes(window.PREVIOUS_PATHNAME);
  const matched = getMatchedRoutes(pathname);

  let diffed = false;
  // stolen from: https://ssr.vuejs.org/guide/data.html#client-data-fetching
  // eslint-disable-next-line no-return-assign
  const activated = matched.filter((r, i) => (
    diffed || (diffed = prevMatched[i] !== r)
  ));

  const fetchers = getDataFetchers(pathname, store, activated);
  const { dispatch } = store;

  window.PREVIOUS_PATHNAME = pathname;

  if (fetchers.length) {
    dispatch(setLoading());

    Promise.all(fetchers).then(() => {
      dispatch(setReady());
    });
  }
});

Loadable.preloadReady().then(() => {
  hydrate(
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.getElementById('root'),
  );
});

if (process.env.NODE_ENV === 'development') {
  module.hot.accept();
}
