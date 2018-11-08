import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import contextReducer from '../store/context/reducer';
import userReducer from '../store/user/reducer';
import scoresRibbonReducer from '../store/scores-ribbon/reducer';
import scoresListReducer from '../store/scores-list/reducer';
import scoreDetailReducer from '../store/score-detail/reducer';

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
