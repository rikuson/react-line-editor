import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'material-ui/svg-icons/editor/insert-drive-file';
import { IconMenu, MenuItem, IconButton } from 'material-ui';

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      copying: false, copied: false, clipboard: '', timerId: '',
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
    const text = this.props.lines.map((l) => l.markdown).join('\n');
    this.setState({ copying: true, clipboard: text });
  }

  copyHtmlData() {
    const text = this.props.lines.map((l) => l.html).join('\n');
    this.setState({ copying: true, clipboard: text });
  }

  copyTextData() {
    const text = this.props.lines.map((l) => l.plain).join('\n');
    this.setState({ copying: true, clipboard: text });
  }

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><Icon /></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <MenuItem onClick={() => this.copyMarkdownData()} primaryText="Markdown" />
          <MenuItem onClick={() => this.copyHtmlData()} primaryText="HTML" />
          <MenuItem onClick={() => this.copyTextData()} primaryText="Text" />
        </IconMenu>
        <span style={{ display: (this.state.copied ? 'inline-block' : 'none') }}>Copied!</span>
      </div>
    );
  }
}

Menu.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    html: PropTypes.string,
    markdown: PropTypes.string,
    text: PropTypes.string,
    editable: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

module.exports = Menu;
