import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Line from '../components/line';
import {
  addLine,
  removeLine,
  changeValue,
  appendValue,
  activateLine,
  disactivateLine,
  storeKey,
  releaseKey,
} from '../actions';

class LineEditor extends React.Component {
  render() {
    const lines = this.props.lineEditor.lines.map((l) => (
      <Line
        onClick={(e) => this.props.clickPreview(l.linenumber, e)}
        onFocus={(e) => this.props.focusEditor(l.linenumber, e)}
        onBlur={(e) => this.props.blurEditor(l.linenumber, e)}
        onChange={(e) => this.props.changeEditor(l.linenumber, e)}
        onKeyDown={(e) => this.props.keyDownEditor(l.linenumber, e)}
        onKeyUp={(e) => this.props.keyUpEditor(l.linenumber, e)}
        onPaste={(e) => this.props.pasteClipboard(l.linenumber, e)}
        key={l.key}
        value={l.value}
        active={l.active}
      >
        {l.html}
      </Line>
    ));
    return <div id="text_field">{lines}</div>;
  }
}

LineEditor.propTypes = {
  lineEditor: PropTypes.shape({
    linenumber: PropTypes.number.isRequired,
    activeKeys: PropTypes.arrayOf(PropTypes.string),
    lines: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      html: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string,
      active: PropTypes.bool.isRequired,
      linenumber: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
  clickPreview: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  blurEditor: PropTypes.func.isRequired,
  changeEditor: PropTypes.func.isRequired,
  keyDownEditor: PropTypes.func.isRequired,
  keyUpEditor: PropTypes.func.isRequired,
  pasteClipboard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lineEditor: state.lineEditor,
});

const mapDispatchToProps = (dispatch) => ({
  clickPreview: (linenumber, e) => dispatch(activateLine(linenumber, e)),
  focusEditor: (linenumber, e) => dispatch(activateLine(linenumber, e)),
  blurEditor: (linenumber, e) => dispatch(disactivateLine(linenumber, e)),
  changeEditor: (linenumber, e) => dispatch(changeValue(linenumber, e, e.target.value)),
  keyDownEditor: (linenumber, e) => {
    const caretPosition = e.target.selectionStart;
    const beforeCaret = e.target.value.slice(0, caretPosition);
    const afterCaret = e.target.value.slice(caretPosition);
    dispatch(storeKey(e.key));
    switch (e.key) {
      case 'ArrowUp':
        // default behavior disturbs movement of cursor
        // need to blur clearly
        if (linenumber) e.target.blur();
        dispatch(activateLine(linenumber - 1, e));
        break;
      case 'ArrowDown':
        dispatch(activateLine(linenumber + 1, e));
        break;
      case 'ArrowLeft':
        if (beforeCaret === '') {
          e.preventDefault();
          e.target.blur();
          dispatch(activateLine(linenumber - 1, e));
        }
        break;
      case 'ArrowRight':
        if (afterCaret === '') {
          e.preventDefault();
          e.target.blur();
          dispatch(activateLine(linenumber + 1, e));
        }
        break;
      case 'Enter':
        dispatch(changeValue(linenumber, e, beforeCaret));
        dispatch(addLine(linenumber + 1, e));
        dispatch(changeValue(linenumber + 1, e, afterCaret));
        break;
      case 'Backspace':
        // Delete new line
        if (linenumber > 0 && caretPosition === 0) {
          e.preventDefault();
          dispatch(appendValue(linenumber - 1, e, afterCaret));
          dispatch(removeLine(linenumber, e));
          dispatch(activateLine(linenumber - 1, e));
        }
        break;
    }
  },
  keyUpEditor: (linenumber, e) => {
    dispatch(releaseKey(e.key));
  },
  pasteClipboard: (linenumber, e) => {
    e.preventDefault();
    const caretPosition = e.target.selectionStart;
    const beforeCaret = e.target.value.slice(0, caretPosition);
    const afterCaret = e.target.value.slice(caretPosition);
    const { clipboardData } = e;
    if (clipboardData !== null) {
      const data = clipboardData.getData('text/plain').split('\n');
      let i = 0;
      dispatch(changeValue(linenumber, e, beforeCaret + data[i]));
      while (++i < data.length - 1) {
        dispatch(addLine(linenumber + i, e));
        dispatch(changeValue(linenumber + i, e, data[i]));
      }
      dispatch(addLine(linenumber + i, e));
      dispatch(changeValue(linenumber + i, e, data[i] + afterCaret));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LineEditor);
