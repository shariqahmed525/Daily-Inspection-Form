import { createStore } from 'redux';

import { middleware, rootReducer } from '../reducers';

export default store = createStore(rootReducer, middleware);