import PropTypes from 'prop-types';
import React from 'react';
import Preview from './preview';
import Editor from './editor';

class Line extends React.Component {
  render() {
    return (
      <div className="line">
        <Preview
          onClick={this.props.onClick}
          style={{ display: !this.props.active ? 'block' : 'none' }}
        >
          {this.props.children}
        </Preview>
        <Editor
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onPaste={this.props.onPaste}
          style={{ display: this.props.active ? 'block' : 'none' }}
          value={this.props.value}
          caret={this.props.caret}
        />
      </div>
    );
  }
}

Line.propTypes = {
  children: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  caret: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
};

module.exports = Line;
