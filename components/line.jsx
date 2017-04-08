import React from 'react';
import Preview from '../components/preview.jsx';
import Editor from '../components/editor.jsx';

class Line extends React.Component{
	display(visible){
		return { display: visible ? 'block' : 'none' };
	}
	render(){
		return (
			<div>
				<Preview
					onClick={this.props.onClick}
					style={this.display(!this.props.editable)}
				>
					{this.props.text}
				</Preview>
				<Editor
					onChange={this.props.onChange}
					onBlur={this.props.onBlur}
					onKeyDown={this.props.onKeyDown}
					style={this.display(this.props.editable)}
					value={this.props.text}
				/>
			</div>
		);
	}
};

Line.propTypes = {
	id: React.PropTypes.number.isRequired,
	text: React.PropTypes.string,
	editable: React.PropTypes.bool,
	clickPreview: React.PropTypes.func.isRequired,
	changeEditor: React.PropTypes.func.isRequired,
	blurEditor: React.PropTypes.func.isRequired,
};

module.exports = Line;
