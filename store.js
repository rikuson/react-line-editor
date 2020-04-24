import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import markdownInterpreter from './markdown-interpreter';
import keybinder from './keybinder';

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}
middlewares.push(markdownInterpreter);
middlewares.push(keybinder);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducer);
export default store;
