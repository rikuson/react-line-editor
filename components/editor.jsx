import PropTypes from 'prop-types';
import React from 'react';

class Editor extends React.Component {
  componentDidMount() {
    this.refs.input.focus();
  }

  componentDidUpdate() {
    if (this.props.style.display) {
      this.refs.input.focus();
    }
  }

  render() {
    const {
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onPaste,
      style,
      value,
    } = this.props;
    return <input className="line-editor" onChange={onChange} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} onPaste={onPaste} style={style} value={value} ref="input" />;
  }
}

Editor.propTypes = {
  style: PropTypes.shape({
    display: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

module.exports = Editor;
