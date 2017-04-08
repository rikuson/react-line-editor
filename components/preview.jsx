import React from 'react';

class Preview extends React.Component{
	render(){
		return (
			<div className="line line-preview" {...this.props} />
		);
	}
};

module.exports = Preview;
