/* global document, window */

import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import App from '../App'; // eslint-disable-line
import configureStore from '../utils/configureStore';
import getDataFetchers from '../utils/getDataFetchers';
import { setLoading, setReady } from '../store/context/actions';

const history = createHistory();
const store = configureStore(window.INITIAL_STATE);

history.listen((location) => {
  const { dispatch } = store;
  const criticalFetchers = getDataFetchers(location.pathname, store);

  dispatch(setLoading());

  Promise.all(criticalFetchers).then(() => {
    dispatch(setReady());
  });
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

// TODO fix me
// module.hot.accept();
