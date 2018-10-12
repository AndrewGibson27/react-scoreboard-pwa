import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import contextReducer from '../store/context/reducers';
import userReducer from '../store/user/reducers';
import scoresRibbonReducer from '../store/scores-ribbon/reducers';
import scoresListReducer from '../store/scores-list/reducers';
import scoreDetailReducer from '../store/score-detail/reducers';

export default function configureStore(initialState) {
  return createStore(
    combineReducers({
      context: contextReducer,
      user: userReducer,
      scoresRibbon: scoresRibbonReducer,
      scoresList: scoresListReducer,
      scoreDetail: scoreDetailReducer,
    }),
    initialState || {},
    applyMiddleware(thunk),
  );
}
