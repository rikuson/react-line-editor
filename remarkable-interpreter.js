import { Remarkable } from 'remarkable';

export default (store) => (next) => (action) => {
  if (action.type === 'DISACTIVATE_LINE') {
    const md = new Remarkable();
    const html = md.render(action.value).replace(/\n$/, '');
    const tmp = window.document.createElement('div');
    tmp.innerHTML = html;
    store.dispatch({
      type: 'INTERPRET_VALUE',
      linenumber: action.linenumber,
      plain: tmp.textContent,
      value: action.value,
      html,
    });
  }
  return next(action);
};
