import { applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducers from './authReducers';

const rootReducer = combineReducers({
  authReducers,
});

const middleware = applyMiddleware(thunk);

export {
  middleware,
  rootReducer
};