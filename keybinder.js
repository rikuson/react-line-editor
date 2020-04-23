export default (store) => (next) => (action) => {
  if (action.type === 'INPUT_SHORTCUT') {
    const { dispatch } = store;
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
        dispatch({ type: 'CHANGE_VALUE', linenumber, value: beforeCaret });
        dispatch({ type: 'ADD_LINE', linenumber: linenumber + 1, value });
        dispatch({ type: 'CHANGE_VALUE', linenumber: linenumber + 1, value: afterCaret });
        break;
      case 'MOVE_UP':
        dispatch({ type: 'DISACTIVATE_LINE', linenumber });
        dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber - 1 });
        break;
      case 'MOVE_DOWN':
        dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber + 1 });
        break;
      case 'MOVE_FORWARD':
        if (afterCaret === '') {
          dispatch({ type: 'DISACTIVATE_LINE', linenumber });
          dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber + 1 });
          dispatch({ type: 'BIND_POSITION', linenumber, caret: 0 });
        } else {
          dispatch({ type: 'BIND_POSITION', linenumber, caret: caret + 1 });
        }
        break;
      case 'MOVE_BACKWARD':
        if (beforeCaret === '') {
          dispatch({ type: 'DISACTIVATE_LINE', linenumber });
          dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber - 1 });
          dispatch({ type: 'BIND_POSITION', linenumber, caret: value.length });
        } else {
          dispatch({ type: 'BIND_POSITION', linenumber, caret: caret - 1 });
        }
        break;
      case 'BACKSPACE':
        if (linenumber > 0 && caret === 0) {
          dispatch({ type: 'APPEND_VALUE', linenumber: linenumber - 1, value: afterCaret });
          dispatch({ type: 'REMOVE_LINE', linenumber });
          dispatch({ type: 'ACTIVATE_LINE', linenumber: linenumber - 1 });
        }
        break;
    }
  }
  return next(action);
};
