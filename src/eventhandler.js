export default (store) => (next) => (action) => {
  const { dispatch } = store;
  const { linenumber, event } = action;
  switch (action.type) {
    case 'ON_CLICK_LINE':
      dispatch({ type: 'ACTIVATE_LINE', linenumber });
      break;
    case 'ON_BLUR_LINE':
      dispatch({ type: 'DISACTIVATE_LINE', linenumber });
      break;
    case 'ON_INPUT_VALUE': {
      const caret = event.target.selectionStart;
      const { value } = event.target;
      dispatch({ type: 'SET_VALUE', linenumber, value });
      dispatch({ type: 'BIND_POSITION', linenumber, caret });
      break;
    }
    case 'ON_PASTE_CLIPBOARD': {
      event.preventDefault();
      const { clipboardData, target } = event;
      const caret = target.selectionStart;
      const beforeCaret = target.value.slice(0, caret);
      const afterCaret = target.value.slice(caret);
      if (clipboardData !== null) {
        const data = clipboardData.getData('text/plain').split('\n');
        let i = 0;
        dispatch({ type: 'SET_VALUE', linenumber, value: beforeCaret + data[i] });
        dispatch({ type: 'RENDER_HTML', linenumber, children: beforeCaret + data[i] });
        while (++i < data.length - 1) {
          dispatch({ type: 'ADD_LINE', linenumber: linenumber + i });
          dispatch({ type: 'SET_VALUE', linenumber: linenumber + i, value: data[i] });
          dispatch({ type: 'RENDER_HTML', linenumber: linenumber + i, children: data[i] });
        }
        dispatch({ type: 'ADD_LINE', linenumber: linenumber + i });
        dispatch({ type: 'SET_VALUE', linenumber: linenumber + i, value: data[i] + afterCaret });
        dispatch({ type: 'RENDER_HTML', linenumber: linenumber + i, children: data[i] + afterCaret });
      }
    }
  }
  return next(action);
};
