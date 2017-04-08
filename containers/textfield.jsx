import React from 'react';
import Line from '../components/line';
import {connect} from 'react-redux';
import { pressKey, changeText, toggleEdit } from '../actions';

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
				onKeyDown={(e) => this.props.pressKeyEditor(l.id, e)}
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
			var editable = true;
			dispatch(toggleEdit(id, editable));
		},
		blurEditor: (id) => {
			var editable = false;
			dispatch(toggleEdit(id, editable));
		},
		changeEditor: (id, e) => {
			dispatch(changeText(id, e.target.value));
		},
		pressKeyEditor: (id, e) => {
			switch(e.key){
				case 'ArrowUp':
					if(id >= 1){
						// default behavior disturbs movement of cursor
						// need to blur manually
						e.target.blur();
						dispatch(toggleEdit(id - 1, true));
					}
					break;
				case 'Enter':
				case 'ArrowDown':
					e.target.blur();
					dispatch(toggleEdit(id + 1, true));
					break;
			}
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TextField);
