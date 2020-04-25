import React from 'react';

export default (store) => (next) => (action) => {
  if (action.type === 'BLUR_LINE') {
    const state = store.getState();
    const { value } = state.lineEditor.lines[action.linenumber];
    const children = React.createElement('div', {}, value);
    store.dispatch({
      type: 'RENDER_HTML',
      linenumber: action.linenumber,
      value,
      children,
    });
  }
  return next(action);
};
