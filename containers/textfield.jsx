import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Line from '../components/line';
import {
  addLine,
  removeLine,
  changeValue,
  appendValue,
  startEditing,
  finishEditing,
} from '../actions';

class TextField extends React.Component {
  render() {
    const lines = this.props.lines.map((l) => (
      <Line
        onClick={() => this.props.clickPreview(l.position)}
        onBlur={() => this.props.blurEditor(l.position)}
        onChange={(e) => this.props.changeEditor(l.position, e)}
        onKeyDown={(e) => this.props.pressKeyEditor(l.position, e)}
        onPaste={(e) => this.props.pasteClipboard(l.position, e)}
        key={l.key}
        html={l.html}
        markdown={l.markdown}
        editable={l.editable}
      />
    ));
    return <div id="text_field">{lines}</div>;
  }
}

TextField.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
    markdown: PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  clickPreview: PropTypes.func.isRequired,
  blurEditor: PropTypes.func.isRequired,
  changeEditor: PropTypes.func.isRequired,
  pressKeyEditor: PropTypes.func.isRequired,
  pasteClipboard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lines: state.lines,
});

const mapDispatchToProps = (dispatch) => ({
  clickPreview: (position) => dispatch(startEditing(position)),
  blurEditor: (position) => dispatch(finishEditing(position)),
  changeEditor: (position, e) => dispatch(changeValue(position, e.target.value)),
  pressKeyEditor: (position, e) => {
    const caretPosition = e.target.selectionStart;
    const beforeCaret = e.target.value.slice(0, caretPosition);
    const afterCaret = e.target.value.slice(caretPosition);
    switch (e.key) {
      case 'ArrowUp':
        // default behavior disturbs movement of cursor
        // need to blur clearly
        if (position) e.target.blur();
        dispatch(startEditing(position - 1));
        break;
      case 'ArrowDown':
        dispatch(startEditing(position + 1));
        break;
      case 'ArrowLeft':
        if (beforeCaret === '') {
          e.preventDefault();
          e.target.blur();
          dispatch(startEditing(position - 1));
        }
        break;
      case 'ArrowRight':
        if (afterCaret === '') {
          e.preventDefault();
          e.target.blur();
          dispatch(startEditing(position + 1));
        }
        break;
      case 'Enter':
        dispatch(changeValue(position, beforeCaret));
        dispatch(addLine(position + 1, afterCaret));
        break;
      case 'Backspace':
        if (position > 0 && caretPosition === 0) {
          e.preventDefault();
          dispatch(appendValue(position - 1, afterCaret));
          dispatch(startEditing(position - 1));
          dispatch(removeLine(position));
        }
        break;
    }
  },
  pasteClipboard: (position, e) => {
    e.preventDefault();
    const caretPosition = e.target.selectionStart;
    const beforeCaret = e.target.value.slice(0, caretPosition);
    const afterCaret = e.target.value.slice(caretPosition);
    const { clipboardData } = e;
    if (clipboardData !== null) {
      const data = clipboardData.getData('text/plain').split('\n');
      let i = 0;
      dispatch(changeValue(position, beforeCaret + data[i]));
      while (++i < data.length - 1) {
        dispatch(addLine(position + i, data[i]));
      }
      dispatch(addLine(position + i, data[i] + afterCaret));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextField);
