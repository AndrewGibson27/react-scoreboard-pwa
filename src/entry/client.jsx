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
import contextReducer from '../store/context/reducers';
import scoresRibbonReducer from '../store/scores-ribbon/reducers';
import scoresListReducer from '../store/scores-list/reducers';
import scoreDetailReducer from '../store/score-detail/reducers';
import getDataFetchers from '../utils/getDataFetchers';
import { setLoading, setReady } from '../store/context/actions';

const history = createHistory();
const store = createStore(
  combineReducers({
    context: contextReducer,
    scoresRibbon: scoresRibbonReducer,
    scoresList: scoresListReducer,
    scoreDetail: scoreDetailReducer,
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
