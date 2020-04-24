import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Shortcuts } from 'react-shortcuts';
import Line from '../components/line';

class LineEditor extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.autoFocus);
  }

  render() {
    const lines = this.props.lineEditor.lines.map((l) => (
      <Shortcuts name="LINE_EDITOR" handler={(shortcut, e) => this.props.keybind(l.linenumber, shortcut, e)} key={l.key} alwaysFireHandler>
        <Line
          onClick={(e) => this.props.clickPreview(l.linenumber, e)}
          onFocus={(e) => this.props.focusEditor(l.linenumber, e)}
          onBlur={(e) => this.props.blurEditor(l.linenumber, e)}
          onChange={(e) => this.props.changeEditor(l.linenumber, e)}
          onPaste={(e) => this.props.pasteClipboard(l.linenumber, e)}
          value={l.value}
          active={l.active}
          caret={this.props.lineEditor.caret}
        >
          {l.html}
        </Line>
      </Shortcuts>
    ));
    return <div id="text_field">{lines}</div>;
  }
}

LineEditor.propTypes = {
  lineEditor: PropTypes.shape({
    linenumber: PropTypes.number.isRequired,
    caret: PropTypes.number.isRequired,
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
  initialize: PropTypes.func.isRequired,
  clickPreview: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  blurEditor: PropTypes.func.isRequired,
  changeEditor: PropTypes.func.isRequired,
  pasteClipboard: PropTypes.func.isRequired,
  keybind: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};

LineEditor.defaultProps = {
  autoFocus: false,
};

const mapStateToProps = (state) => ({
  lineEditor: state.lineEditor,
});

const mapDispatchToProps = (dispatch) => ({
  initialize: (autoFocus) => {
    if (autoFocus) {
      dispatch({ type: 'ACTIVATE_LINE', linenumber: 0 });
    }
  },
  clickPreview: (linenumber) => dispatch({ type: 'ACTIVATE_LINE', linenumber }),
  focusEditor: (linenumber) => dispatch({ type: 'FOCUS_LINE', linenumber }),
  blurEditor: (linenumber) => {
    dispatch({ type: 'BLUR_LINE', linenumber });
    dispatch({ type: 'DISACTIVATE_LINE', linenumber });
  },
  changeEditor: (linenumber, e) => {
    const { value } = e.target;
    // FIXME: forBackspace
    const caret = e.target.selectionStart + 1;
    dispatch({ type: 'CHANGE_VALUE', linenumber, value });
    dispatch({ type: 'BIND_POSITION', linenumber, caret });
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
      dispatch({ type: 'CHANGE_VALUE', linenumber, value: beforeCaret + data[i] });
      while (++i < data.length - 1) {
        dispatch({ type: 'ADD_LINE', linenumber: linenumber + i });
        dispatch({ type: 'CHANGE_VALUE', linenumber: linenumber + i, value: data[i] });
      }
      dispatch({ type: 'ADD_LINE', linenumber: linenumber + i });
      dispatch({ type: 'CHANGE_VALUE', linenumber: linenumber + i, value: data[i] + afterCaret });
    }
  },
  keybind: (linenumber, shortcut, e) => {
    e.preventDefault();
    const caret = e.target.selectionStart;
    const { value } = e.target;
    dispatch({
      type: 'INPUT_SHORTCUT',
      shortcut,
      linenumber,
      caret,
      value,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LineEditor);
