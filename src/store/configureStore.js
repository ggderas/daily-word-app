import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import userReducer from '../reducers/user';
import wordsReducer from '../reducers/words';
import topUsersReducer from '../reducers/topUsers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      randomWord: wordsReducer,
      user: userReducer,
      topUsers:  topUsersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
