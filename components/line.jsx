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
          style={{ display: !this.props.editable ? 'block' : 'none' }}
        >
          {this.props.html}
        </Preview>
        <Editor
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onKeyDown={this.props.onKeyDown}
          onPaste={this.props.onPaste}
          style={{ display: this.props.editable ? 'block' : 'none' }}
          value={this.props.markdown}
        />
      </div>
    );
  }
}

Line.propTypes = {
  html: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
};

module.exports = Line;
