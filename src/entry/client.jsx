/* global document, window */

import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import Loadable from 'react-loadable';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import App from '../App'; // eslint-disable-line
import adminReducer from '../store/admin/reducers';
import barReducer from '../store/bar/reducers';
import bazReducer from '../store/baz/reducers';
import contextReducer from '../store/context/reducers';
import getDataFetchers from '../utils/getDataFetchers';
import { setLoading, setReady } from '../store/context/actions';

const history = createHistory();
const store = createStore(
  combineReducers({
    adminState: adminReducer,
    barState: barReducer,
    bazState: bazReducer,
    context: contextReducer,
  }),
  window.INITIAL_STATE,
  applyMiddleware(thunk),
);

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
