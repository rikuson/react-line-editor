import React from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends React.Component{
	render(){
		return (
			<AppBar
				title="VMDE"
				showMenuIconButton={false}
				iconElementLeft=""
			/>
		);
	}
};

module.exports = Header;
