import { Remarkable } from 'remarkable';

export default (store) => (next) => (action) => {
  if (action.type === 'BLUR_LINE') {
    const state = store.getState();
    const { value } = state.lineEditor.lines[action.linenumber];
    const md = new Remarkable();
    const html = md.render(value).replace(/\n$/, '');
    store.dispatch({
      type: 'INTERPRET_VALUE',
      linenumber: action.linenumber,
      value,
      html,
    });
  }
  return next(action);
};
