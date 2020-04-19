import { Remarkable } from 'remarkable';
import { DISACTIVATE_LINE, INTERPRET_VALUE } from './actions';

export default (store) => (next) => (action) => {
  if (action.type === DISACTIVATE_LINE) {
    const state = store.getState();
    const { value } = action.event.target;
    const md = new Remarkable();
    const html = md.render(value).replace(/\n$/, '');
    const tmp = window.document.createElement('div');
    tmp.innerHTML = html;
    store.dispatch({
      type: INTERPRET_VALUE,
      linenumber: state.lineEditor.linenumber,
      plain: tmp.textContent,
      value,
      html,
    });
  }
  return next(action);
};
