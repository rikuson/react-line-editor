import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import editorReducer from './reducers';
import { changeText } from './actions'

const store = createStore(editorReducer);

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			text: 'test',
			editable: false,
		};
	}
	handleChange(e){
		store.dispatch(changeText(e.target.value));
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
		function display(visible){
			var obj = {};
			obj.display = visible ? 'block' : 'none';
			return obj;
		}
		return (
			<div>
				<div
					style={display(!this.state.editable)}
					onClick={this.handleClick.bind(this)}
				>
					{this.state.text}
				</div>
				<input
					style={display(this.state.editable)}
					value={this.state.text}
					onBlur={this.handleBlur.bind(this)}
					onChange={this.handleChange.bind(this)}
					ref="input"
				/>
			</div>
		);
	}
};

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('app')
	);
}

store.subscribe(() => {
	render();
	console.log(store.getState());
});

render();
