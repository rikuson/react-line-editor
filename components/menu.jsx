import React from 'react';
import Icon from 'material-ui/svg-icons/editor/insert-drive-file';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

class Menu extends React.Component{
	copyMarkdownData() {
    const text = this.props.lines.map(l => l.text).join("\n");
    console.log(text);
	}
	copyHtmlData() {
		console.log('Html');
		// console.log(this.props.markdownData);
	}
	copyTextData() {
		console.log('Text');
		// console.log(this.props.markdownData);
	}
	render() {
		return (
			<IconMenu
				iconButtonElement={<IconButton><Icon/></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
			>
				<MenuItem onClick={() => this.copyMarkdownData()} primaryText="Markdown" />
				<MenuItem onClick={() => this.copyHtmlData()} primaryText="HTML" />
				<MenuItem onClick={() => this.copyTextData()} primaryText="Text" />
			</IconMenu>
		);
	}
};

module.exports = Menu;
