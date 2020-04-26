export default (store) => (next) => (action) => {
  if (action.type === 'ON_BLUR_LINE') {
    const state = store.getState();
    const { value } = state.lineEditor.lines[action.linenumber];
    store.dispatch({
      type: 'RENDER_HTML',
      linenumber: action.linenumber,
      children: value,
    });
  }
  return next(action);
};
