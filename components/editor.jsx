import React from 'react';

class Editor extends React.Component{
	componentDidUpdate(){
		if(this.props.style.display === 'block'){
			this.refs.input.focus();
		}
	}
	render(){
		return (
			<input {...this.props} ref="input" />
		);
	}
};

module.exports = Editor;
