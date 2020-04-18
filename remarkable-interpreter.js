import { Remarkable } from 'remarkable';
import { DISACTIVATE_LINE, INTERPRET_VALUE } from './actions';

export default (store) => (next) => (action) => {
  if (action.type === DISACTIVATE_LINE) {
    const state = store.getState();
    const md = new Remarkable();
    const html = md.render(action.value).replace(/\n$/, '');
    const tmp = window.document.createElement('div');
    tmp.innerHTML = html;
    store.dispatch({
      type: INTERPRET_VALUE,
      position: state.textfield.position,
      plain: tmp.textContent,
      markdown: action.value,
      html,
    });
  }
  return next(action);
};
