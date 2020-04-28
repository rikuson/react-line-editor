import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ShortcutManager, Shortcuts } from 'react-shortcuts';
import Line from '../components/line';
import keymap from '../keymap';

const shortcutManager = new ShortcutManager({ LINE_EDITOR: keymap });

class TextField extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {
        background: '#FFF',
        padding: 7,
        margin: 7,
      },
    };
  }

  getChildContext() {
    return { shortcuts: shortcutManager };
  }

  componentDidMount() {
    const { autoFocus, placeholder, children } = this.props;
    this.props.initLine({
      autoFocus,
      placeholder,
      children,
    });
  }

  render() {
    const lines = this.props.lineEditor.lines.map((l) => (
      <Shortcuts name="LINE_EDITOR" handler={(shortcut, e) => this.props.keybind(l.linenumber, shortcut, e)} key={l.key} alwaysFireHandler>
        <Line
          onClick={(e) => this.props.clickLine(l.linenumber, e)}
          onFocus={(e) => this.props.focusLine(l.linenumber, e)}
          onBlur={(e) => this.props.blurLine(l.linenumber, e)}
          onChange={(e) => this.props.changeValue(l.linenumber, e)}
          onPaste={(e) => this.props.pasteClipboard(l.linenumber, e)}
          value={l.value}
          active={l.active}
          caret={this.props.lineEditor.caret}
          className={l.className || ''}
          placeholder={l.placeholder}
        >
          {l.children || ''}
        </Line>
      </Shortcuts>
    ));
    return <div style={{ ...this.state.style, ...this.props.style }}>{lines}</div>;
  }
}

TextField.propTypes = {
  lineEditor: PropTypes.shape({
    linenumber: PropTypes.number.isRequired,
    caret: PropTypes.number.isRequired,
    activeKeys: PropTypes.arrayOf(PropTypes.string),
    lines: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ]),
      className: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string,
      active: PropTypes.bool.isRequired,
      linenumber: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
  initLine: PropTypes.func.isRequired,
  clickLine: PropTypes.func.isRequired,
  focusLine: PropTypes.func.isRequired,
  blurLine: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  pasteClipboard: PropTypes.func.isRequired,
  keybind: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

TextField.childContextTypes = {
  shortcuts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lineEditor: state.lineEditor,
});

const mapDispatchToProps = (dispatch) => ({
  initLine: (props) => dispatch({ type: 'ON_LOAD_TEXTFIELD', linenumber: 0, props }),
  clickLine: (linenumber, event) => dispatch({ type: 'ON_CLICK_LINE', linenumber, event }),
  focusLine: (linenumber, event) => dispatch({ type: 'ON_FOCUS_LINE', linenumber, event }),
  blurLine: (linenumber, event) => dispatch({ type: 'ON_BLUR_LINE', linenumber, event }),
  changeValue: (linenumber, event) => dispatch({ type: 'ON_INPUT_VALUE', linenumber, event }),
  pasteClipboard: (linenumber, event) => dispatch({ type: 'ON_PASTE_CLIPBOARD', linenumber, event }),
  keybind: (linenumber, shortcut, e) => {
    e.preventDefault();
    const caret = e.target.selectionStart;
    const { value } = e.target;
    dispatch({
      type: 'ON_INPUT_SHORTCUT',
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
)(TextField);
