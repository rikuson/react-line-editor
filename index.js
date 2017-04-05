import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
	text: null,
};

//const store = createStore(, initialState);

class Index extends React.Component{
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
		this.setState({ editable: true }, () => {
			this.refs.input.focus();
		});
	}
	render(){
		function style(visible){
			var obj = {};
			obj.display = visible ? 'block' : 'none';
			return obj;
		}
		return (
			<div>
				<div
					style={style(!this.state.editable)}
					onClick={this.handleClick.bind(this)}
				>
					{this.state.text}
				</div>
				<input
					style={style(this.state.editable)}
					value={this.state.text}
					onBlur={this.handleBlur.bind(this)}
					onChange={this.handleChange.bind(this)}
					ref="input"
				/>
			</div>
		);
	}
};

ReactDOM.render(
	<Index />,
	document.getElementById('app')
);
