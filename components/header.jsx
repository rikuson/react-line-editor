import React from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from './menu';

class Header extends React.Component{
	render(){
		return (
			<AppBar
				title="LMDEditor"
				showMenuIconButton={false}
				iconElementRight={<Menu />}
			/>
		);
	}
};

module.exports = Header;
