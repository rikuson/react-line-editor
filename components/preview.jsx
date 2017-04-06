import React from 'react';
import {connect} from 'react-redux';

class Preview extends React.Component{
	render(){
		return (
			<div {...this.props} />
		);
	}
};

module.exports = Preview;
