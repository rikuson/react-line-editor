import PropTypes from 'prop-types';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from './menu';

class Header extends React.Component {
  render() {
    const menu = <Menu lines={this.props.lines} />;
    return (
      <AppBar
        title="LMDEditor"
        showMenuIconButton={false}
        iconElementRight={menu}
      />
    );
  }
}

Header.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    html: PropTypes.string,
    markdown: PropTypes.string,
    text: PropTypes.string,
    editable: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

module.exports = Header;
