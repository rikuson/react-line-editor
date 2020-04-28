import PropTypes from 'prop-types';
import React from 'react';

class Preview extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {
        overflow: 'hidden',
      },
    };
  }

  render() {
    return (
      <div
        role="article"
        onClick={this.props.onClick}
        style={{
          ...this.state.style,
          ...this.props.style,
          display: this.props.show ? 'block' : 'none',
          color: this.props.children ? '#111' : '#8E8E8E',
        }}
      >
        {this.props.children || this.props.placeholder}
      </div>
    );
  }
}

Preview.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  placeholder: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
};

Preview.defaultProps = {
  placeholder: '',
};

module.exports = Preview;
