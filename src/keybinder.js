export default (store) => (next) => (action) => {
  if (action.type === 'ON_INPUT_SHORTCUT') {
    const { dispatch } = store;
    const state = store.getState();
    const {
      shortcut,
      linenumber,
      caret,
      value,
    } = action;
    const beforeCaret = value.slice(0, caret);
    const afterCaret = value.slice(caret);
    // TODO: Yank
    switch (shortcut) {
      case 'ADD_LINE':
        dispatch({ type: 'SET_VALUE', linenumber, value: beforeCaret });
        dispatch({ type: 'ADD_LINE', linenumber: linenumber + 1 });
        dispatch({ type: 'SET_VALUE', linenumber: linenumber + 1, value: afterCaret });
        dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber + 1 });
        dispatch({ type: 'BIND_POSITION', linenumber: linenumber + 1, caret: 0 });
        break;
      case 'MOVE_UP':
        dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber - 1 });
        break;
      case 'MOVE_DOWN':
        dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber + 1 });
        break;
      case 'MOVE_FORWARD':
        if (afterCaret === '') {
          dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber + 1 });
        } else {
          dispatch({ type: 'BIND_POSITION', linenumber, caret: caret + 1 });
        }
        break;
      case 'MOVE_BACKWARD':
        if (beforeCaret === '') {
          dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber - 1 });
        } else {
          dispatch({ type: 'BIND_POSITION', linenumber, caret: caret - 1 });
        }
        break;
      case 'BACKSPACE':
        if (linenumber > 0 && caret === 0) {
          const { lines } = state.lineEditor;
          dispatch({ type: 'APPEND_VALUE', linenumber: linenumber - 1, value: afterCaret });
          dispatch({ type: 'REMOVE_LINE', linenumber });
          dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber - 1 });
          dispatch({ type: 'BIND_POSITION', linenumber: linenumber - 1, caret: lines[linenumber - 1].value.length });
        } else {
          dispatch({ type: 'SET_VALUE', linenumber, value: value.slice(0, value.length - 1) });
          dispatch({ type: 'BIND_POSITION', linenumber, caret: caret - 1 });
        }
        break;
    }
  }
  return next(action);
};
