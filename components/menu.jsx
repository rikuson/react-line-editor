import React from 'react';
import Icon from 'material-ui/svg-icons/editor/insert-drive-file';
import { IconMenu, MenuItem, IconButton } from 'material-ui';
import { Remarkable } from 'remarkable';

class Menu extends React.Component{
  constructor() {
    super();
    this.state = { copied: false, clipboard: '' };
  }
	display(visible) {
		return { display: visible ? 'inline-block' : 'none' };
	}
  copy(e) {
    e.clipboardData.setData("text/plain" , this.state.clipboard);
    e.preventDefault();
    document.removeEventListener("copy", this.copy);
  }
  copyMarkdownData() {
    const text = this.props.lines.map(l => l.text).join("\n");
    this.setState({ copied: true, clipboard: text });
    document.addEventListener("copy", this.copy.bind(this));
    document.execCommand("copy");
    setTimeout(() => this.setState({ copied: false }), 3000);
  }
  copyHtmlData() {
    const md = new Remarkable();
    const text = md.render(this.props.lines.map(l => l.text).join("\n"));
    this.setState({ copied: true, clipboard: text });
    document.addEventListener("copy", this.copy.bind(this));
    document.execCommand("copy");
    setTimeout(() => this.setState({ copied: false }), 3000);
  }
  copyTextData() {
    // FIXME: It copies including needless lines.
    const text = document.getElementById("text_field");;
    const range = document.createRange();
    range.selectNodeContents(element);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    this.setState({ copied: true, clipboard: text });
    setTimeout(() => this.setState({ copied: false }), 3000);
  }
	render() {
		return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><Icon/></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <MenuItem onClick={() => this.copyMarkdownData()} primaryText="Markdown" />
          <MenuItem onClick={() => this.copyHtmlData()} primaryText="HTML" />
          <MenuItem onClick={() => this.copyTextData()} primaryText="Text" />
        </IconMenu>
        <span style={this.display(this.state.copied)}>Copied!</span>
      </div>
		);
	}
};

module.exports = Menu;
