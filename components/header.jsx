import React from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from './menu';

const style = { position: "fixed" };

class Header extends React.Component{
	render(){
		return (
			<AppBar
				title="LMDEditor"
				showMenuIconButton={false}
				iconElementRight={<Menu />}
				style={style}
			/>
		);
	}
};

module.exports = Header;
