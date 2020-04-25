import PropTypes from 'prop-types';
import React from 'react';

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {},
    };
    this.input = React.createRef();
  }

  componentDidMount() {
    if (this.props.show) {
      this.input.current.focus();
    }
  }

  componentDidUpdate() {
    this.input.current.selectionStart = this.props.caret;
    this.input.current.selectionEnd = this.props.caret;
    if (this.props.show) {
      this.input.current.focus();
    } else {
      this.input.current.blur();
    }
  }

  render() {
    return (
      <input
        onChange={this.props.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onPaste={this.props.onPaste}
        style={{
          ...this.state.style,
          ...this.props.style,
          display: this.props.show ? 'block' : 'none',
        }}
        value={this.props.value}
        ref={this.input}
      />
    );
  }
}

Editor.propTypes = {
  style: PropTypes.shape({
    display: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  caret: PropTypes.number.isRequired,
};

module.exports = Editor;
