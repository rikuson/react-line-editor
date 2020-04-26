import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import interpreter from './interpreter';
import keybinder from './keybinder';
import eventhandler from './eventhandler';

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}
middlewares.push(interpreter);
middlewares.push(keybinder);
middlewares.push(eventhandler);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducer);
export default store;
