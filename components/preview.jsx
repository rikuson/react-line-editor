import React from 'react';
import {connect} from 'react-redux';

class Preview extends React.Component{
	render(){
		return (
			<div className="line line-preview" {...this.props} />
		);
	}
};

module.exports = Preview;
