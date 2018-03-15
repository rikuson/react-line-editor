import React from 'react';
import Icon from 'material-ui/svg-icons/editor/insert-drive-file';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

class Menu extends React.Component{
	render(){
		return (
			<IconMenu
				iconButtonElement={<IconButton><Icon/></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
			>
				<MenuItem primaryText="Markdown" />
				<MenuItem primaryText="HTML" />
				<MenuItem primaryText="Text" />
			</IconMenu>
		);
	}
};

module.exports = Menu;
