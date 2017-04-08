import React from 'react';
import Line from '../components/line';
import {connect} from 'react-redux';
import { changeText, toggleEdit } from '../actions';

const style = {
	paddingTop: "72px",
};

class TextField extends React.Component{
	render(){
		let lines = this.props.lines.map((l) =>
			<Line
				{...l}
				onClick={() => this.props.clickPreview(l.id)}
				onBlur={() => this.props.blurEditor(l.id)}
				onChange={(e) => this.props.changeEditor(l.id, e)}
			/>
		);
		return (
			<div style={style}>{lines}</div>
		);
	}
};

TextField.propTypes = {
	lines: React.PropTypes.arrayOf(React.PropTypes.shape({
		id: React.PropTypes.number.isRequired,
		text: React.PropTypes.string,
		editable: React.PropTypes.bool.isRequired,
	}).isRequired).isRequired,
	clickPreview: React.PropTypes.func.isRequired,
	blurEditor: React.PropTypes.func.isRequired,
	changeEditor: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	return {
		lines: state.lines,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clickPreview: (id) => {
			dispatch(toggleEdit(id));
		},
		blurEditor: (id) => {
			dispatch(toggleEdit(id));
		},
		changeEditor: (id, e) => {
			dispatch(changeText(id, e.target.value));
		},
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TextField);
