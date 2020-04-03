import React from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from './menu';

class Header extends React.Component{
	render(){
    const menu = <Menu lines={this.props.lines} />
		return (
			<AppBar
				title="LMDEditor"
				showMenuIconButton={false}
				iconElementRight={menu}
			/>
		);
	}
};

module.exports = Header;
