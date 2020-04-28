import PropTypes from 'prop-types';
import React from 'react';
import Preview from './preview';
import Editor from './editor';

class Line extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {
        fontFamily: 'inherit',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        minHeight: '1.5rem',
        padding: '.25rem',
        width: 'calc(100% - .5rem)',
        margin: '0 auto',
        cursor: 'text',
        border: 'none',
        borderRadius: 0,
        outline: 0,
      },
    };
  }

  render() {
    return (
      <div className={this.props.className}>
        <Preview
          onClick={this.props.onClick}
          style={{ ...this.state.style, ...this.props.style }}
          show={!this.props.active}
          placeholder={this.props.placeholder}
        >
          {this.props.children}
        </Preview>
        <Editor
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onPaste={this.props.onPaste}
          style={{ ...this.state.style, ...this.props.style }}
          show={this.props.active}
          value={this.props.value}
          caret={this.props.caret}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

Line.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  caret: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string,
};

Line.defaultProps = {
  children: '',
  style: {},
  placeholder: '',
};

module.exports = Line;
