import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Preview from '../components/preview.jsx';
import Editor from '../components/editor.jsx';

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			text: 'test',
			editable: false,
		};
	}
	handleChange(e){
		this.setState({ text: e.target.value });
	}
	handleBlur(){
		this.setState({ editable: false });
	}
	handleClick(e){
		this.setState({ editable: true });
	}
	render(){
		const display = function(visible){
			return { display: visible ? 'block' : 'none' };
		};
		return (
			<div>
				<Preview
					onClick={this.handleClick.bind(this)}
					style={display(!this.state.editable)}
				>
					{this.state.text}
				</Preview>
				<Editor
					onChange={this.handleChange.bind(this)}
					onBlur={this.handleBlur.bind(this)}
					style={display(this.state.editable)}
					value={this.state.text}
				/>
			</div>
		);
	}
};

module.exports = App;
