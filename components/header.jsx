import React from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends React.Component{
	render(){
		return (
			<AppBar
				title="LENEAR MARKDOWN EDITOR"
				showMenuIconButton={false}
				iconElementLeft=""
			/>
		);
	}
};

module.exports = Header;
