import React from 'react';
import Line from '../components/line';
import { connect } from 'react-redux';
import {
	addLine,
	removeLine,
	pressKey,
	changeText,
	appendText,
	prependText,
	startEditing,
	finishEditing,
} from '../actions';

class TextField extends React.Component{
	render() {
		let lines = this.props.lines.map(l =>
			<Line
				{...l}
				onClick={() => this.props.clickPreview(l.position)}
				onBlur={() => this.props.blurEditor(l.position)}
				onChange={e => this.props.changeEditor(l.position, e)}
				onKeyDown={e => this.props.pressKeyEditor(l.position, e)}
			/>
		);
		return <div id="text_field">{lines}</div>;
	}
};

TextField.propTypes = {
	lines: React.PropTypes.arrayOf(React.PropTypes.shape({
		key: React.PropTypes.string.isRequired,
		text: React.PropTypes.string,
		editable: React.PropTypes.bool.isRequired,
		position: React.PropTypes.number.isRequired,
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
		clickPreview: position => dispatch(startEditing(position)),
		blurEditor: position => dispatch(finishEditing(position)),
		changeEditor: (position, e) => dispatch(changeText(position, e.target.value)),
		pressKeyEditor: (position, e) => {
			let caretPosition = e.target.selectionStart;
			let beforeCaret = e.target.value.slice(0, caretPosition);
			let afterCaret = e.target.value.slice(caretPosition);
			switch(e.key){
				case 'ArrowUp':
					// default behavior disturbs movement of cursor
					// need to blur clearly
					if (position) e.target.blur();
					dispatch(startEditing(position - 1));
					break;
				case 'ArrowDown':
					dispatch(startEditing(position + 1));
					break;
				case 'ArrowLeft':
					if (beforeCaret === '') {
						e.preventDefault();
						e.target.blur();
						dispatch(startEditing(position - 1));
					}
					break;
				case 'ArrowRight':
					if (afterCaret === '') {
						e.preventDefault();
						e.target.blur();
						dispatch(startEditing(position + 1));
					}
					break;
				case 'Enter':
					dispatch(changeText(position, beforeCaret));
					dispatch(addLine(position + 1, afterCaret));
					break;
				case 'Backspace':
					if (position > 0 && caretPosition === 0) {
						e.preventDefault();
						dispatch(appendText(position - 1, afterCaret));
						dispatch(startEditing(position - 1));
						dispatch(removeLine(position));
					}
					break;
			}
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TextField);
