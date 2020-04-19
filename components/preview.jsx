import PropTypes from 'prop-types';
import React from 'react';

class Preview extends React.Component {
  render() {
    const { onClick, style, children } = this.props;
    return (
      <div
        className="line-preview"
        role="article"
        onClick={onClick}
        style={style}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );
  }
}

Preview.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.shape({
    display: PropTypes.isRequired,
  }).isRequired,
};

module.exports = Preview;
