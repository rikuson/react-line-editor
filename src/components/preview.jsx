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
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Preview.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
};

module.exports = Preview;
