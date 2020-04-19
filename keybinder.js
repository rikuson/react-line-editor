import { KEY_UP, KEY_DOWN } from './actions';

export default (store) => (next) => (action) => {
  let activeKeys = [];
  if (action.type === KEY_DOWN) {
    if (!activeKeys.includes(action.key)) {
      activeKeys.push(action.key);
    }
  }
  if (action.type === KEY_UP) {
    activeKeys = activeKeys.filter((k) => k !== action.key);
  }
  window.console.log(activeKeys);
  return next(action);
};
