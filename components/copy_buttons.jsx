import React from 'react';
import Icon from 'material-ui/svg-icons/editor/insert-drive-file';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

class CopyButtons extends React.Component{
	render(){
		return (
			<Toolbar>
				<ToolbarGroup>
					<Icon />
					<ToolbarSeparator />
					<FlatButton label="Markdown" primary={true} />
					<FlatButton label="HTML" primary={true} />
					<FlatButton label="Text" primary={true} />
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

module.exports = CopyButtons;
