import PropTypes from 'prop-types';
import React from 'react';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import {
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  AppBar,
  Tooltip,
} from '@material-ui/core';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
      anchorEl: null,
      copying: false,
      copied: false,
      clipboard: '',
      textType: '',
    };
  }

  componentDidUpdate() {
    if (this.state.copying) {
      window.document.addEventListener('copy', this.copy.bind(this));
      window.document.execCommand('copy');
      if (this.state.timerId !== '') {
        window.clearTimeout(this.state.timerId);
      }
      const timerId = window.setTimeout(() => {
        this.setState({ copied: false });
      }, 3000);
      this.setState({ copying: false, copied: true, timerId });
    }
  }

  copy(e) {
    e.clipboardData.setData('text/plain', this.state.clipboard);
    e.preventDefault();
    window.document.removeEventListener('copy', this.copy);
  }

  copyMarkdownData() {
    const text = this.props.lines.map((l) => l.value).join('\n');
    this.setState({
      menuOpen: false,
      copying: true,
      clipboard: text,
      textType: 'value',
    });
  }

  copyHtmlData() {
    const text = this.props.lines.map((l) => l.html).join('\n');
    this.setState({
      menuOpen: false,
      copying: true,
      clipboard: text,
      textType: 'html',
    });
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(e) => this.setState({ menuOpen: true, anchorEl: e.currentTarget })}
            color="inherit"
          >
            <InsertDriveFile />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.menuOpen}
          >
            <Tooltip title="Copied!" open={this.state.copied && this.state.textType === 'value'}>
              <MenuItem onClick={() => this.copyMarkdownData()}>Markdown</MenuItem>
            </Tooltip>
            <Tooltip title="Copied!" open={this.state.copied && this.state.textType === 'html'}>
              <MenuItem onClick={() => this.copyHtmlData()}>Html</MenuItem>
            </Tooltip>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    html: PropTypes.string,
    value: PropTypes.string,
    text: PropTypes.string,
    active: PropTypes.bool.isRequired,
    linenumber: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

module.exports = Header;
