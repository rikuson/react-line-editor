import React from 'react';
import Markdown from 'react-remarkable';

class Preview extends React.Component{
	render(){
		return (
			<div className="line line-preview" {...this.props}>
				<Markdown>{this.props.children}</Markdown>
			</div>
		);
	}
};

module.exports = Preview;
