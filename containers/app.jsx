import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header.jsx';
import TextField from './textfield.jsx';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header lines={this.props.lines} />
				<TextField />
			</div>
		);
	}
};

App.propTypes = {
	lines: React.PropTypes.arrayOf(React.PropTypes.shape({
		key: React.PropTypes.string.isRequired,
		html: React.PropTypes.string,
		markdown: React.PropTypes.string,
		text: React.PropTypes.string,
		editable: React.PropTypes.bool.isRequired,
		position: React.PropTypes.number.isRequired,
	}).isRequired).isRequired,
}

const mapStateToProps = (state) => {
	return {
		lines: state.lines,
	};
};

export default connect(
	mapStateToProps,
)(App);
