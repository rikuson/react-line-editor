import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Shortcuts } from 'react-shortcuts';
import store from '../store';
import Line from '../components/line';

class LineEditor extends React.Component {
  componentDidMount() {
    this.props.initLine(this.props.autoFocus);
  }

  render() {
    const lines = this.props.lineEditor.lines.map((l) => (
      <Shortcuts name="LINE_EDITOR" handler={(shortcut, e) => this.props.keybind(l.linenumber, shortcut, e)} key={l.key} alwaysFireHandler>
        <Line
          onClick={(e) => {
            this.props.clickLine(l.linenumber, e);
            this.props.onClick(e, l);
          }}
          onFocus={(e) => {
            this.props.focusLine(l.linenumber, e);
            this.props.onFocus(e, l);
          }}
          onBlur={(e) => {
            this.props.blurLine(l.linenumber, e);
            this.props.onBlur(e, l);
          }}
          onChange={(e) => {
            this.props.changeValue(l.linenumber, e);
            this.props.onChange(e, l);
          }}
          onPaste={(e) => {
            this.props.pasteClipboard(l.linenumber, e);
            this.props.onPaste(e, l);
          }}
          value={l.value}
          active={l.active}
          caret={this.props.lineEditor.caret}
          className={l.className}
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
      className: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string,
      active: PropTypes.bool.isRequired,
      linenumber: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onPaste: PropTypes.func,
  initLine: PropTypes.func.isRequired,
  clickLine: PropTypes.func.isRequired,
  focusLine: PropTypes.func.isRequired,
  blurLine: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  pasteClipboard: PropTypes.func.isRequired,
  keybind: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};

LineEditor.defaultProps = {
  autoFocus: false,
  onClick: (e, line) => {
    store.dispatch({ type: 'ACTIVATE_LINE', linenumber: line.linenumber });
  },
  onFocus: () => null,
  onBlur: (e, line) => {
    if (line.active) {
      store.dispatch({ type: 'DISACTIVATE_LINE', linenumber: line.linenumber });
    }
  },
  onChange: (e, line) => {
    const caret = e.target.selectionStart;
    store.dispatch({ type: 'BIND_POSITION', linenumber: line.linenumber, caret });
  },
  onPaste: () => null,
};

const mapStateToProps = (state) => ({
  lineEditor: state.lineEditor,
});

const mapDispatchToProps = (dispatch) => ({
  initLine: (autoFocus) => dispatch({ type: 'INIT_LINE', linenumber: 0, active: autoFocus }),
  clickLine: (linenumber) => dispatch({ type: 'CLICK_LINE', linenumber }),
  focusLine: (linenumber) => dispatch({ type: 'FOCUS_LINE', linenumber }),
  blurLine: (linenumber) => dispatch({ type: 'BLUR_LINE', linenumber }),
  changeValue: (linenumber, e) => {
    const { value } = e.target;
    dispatch({ type: 'CHANGE_VALUE', linenumber, value });
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
