import React from 'react';
import MarkdownIt from 'markdown-it';

export default (store) => (next) => (action) => {
  if (action.type === 'ON_BLUR_LINE') {
    const state = store.getState();
    const { value } = state.lineEditor.lines[action.linenumber];
    const md = new MarkdownIt();
    const className = md.parse(value)
      .filter((token) => token.type !== 'inline')
      .map((token) => token.tag)
      .filter((tag, i, self) => self.indexOf(tag) === i)
      .join(' ');
    // TODO: createElementFromToken
    const html = md.render(value).replace(/\n$/, '');
    const children = React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
    store.dispatch({
      type: 'RENDER_HTML',
      linenumber: action.linenumber,
      className,
      children,
    });
  }
  return next(action);
};
