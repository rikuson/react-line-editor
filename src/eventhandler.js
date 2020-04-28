export default (store) => (next) => (action) => {
  const { dispatch } = store;
  const { linenumber } = action;
  switch (action.type) {
    case 'ON_LOAD_TEXTFIELD': {
      const { autoFocus, children, placeholder } = action.props;
      if (autoFocus) {
        dispatch({ type: 'ACTIVATE_LINE', linenumber });
      }
      {
        const data = placeholder.split('\n');
        let i = 0;
        dispatch({ type: 'SET_PLACEHOLDER', linenumber, placeholder: data[i] });
        while (++i <= data.length - 1) {
          dispatch({ type: 'ADD_LINE', linenumber: linenumber + i });
          dispatch({ type: 'SET_PLACEHOLDER', linenumber: linenumber + i, placeholder: data[i] });
        }
      }
      {
        const data = children.split('\n');
        let i = 0;
        dispatch({ type: 'SET_VALUE', linenumber, value: data[i] });
        dispatch({ type: 'RENDER_HTML', linenumber, children: data[i] });
        while (++i <= data.length - 1) {
          dispatch({ type: 'ADD_LINE', linenumber: linenumber + i });
          dispatch({ type: 'SET_VALUE', linenumber: linenumber + i, value: data[i] });
          dispatch({ type: 'RENDER_HTML', linenumber: linenumber + i, children: data[i] });
        }
      }
      break;
    }
    case 'ON_CLICK_LINE':
      dispatch({ type: 'ACTIVATE_LINE', linenumber });
      break;
    case 'ON_BLUR_LINE':
      dispatch({ type: 'DISACTIVATE_LINE', linenumber });
      break;
    case 'ON_INPUT_VALUE': {
      const caret = action.event.target.selectionStart;
      const { value } = action.event.target;
      dispatch({ type: 'SET_VALUE', linenumber, value });
      dispatch({ type: 'BIND_POSITION', linenumber, caret });
      break;
    }
    case 'ON_PASTE_CLIPBOARD': {
      action.event.preventDefault();
      const { clipboardData, target } = action.event;
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
