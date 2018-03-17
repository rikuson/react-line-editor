import React from 'react';

class Editor extends React.Component{
	componentDidMount() {
		this.refs.input.focus();
	}
	componentDidUpdate() {
		if (this.props.style.display) {
			this.refs.input.focus();
		}
	}
	render() {
		return <input className="line-editor" {...this.props} ref="input" />;
	}
};

module.exports = Editor;
