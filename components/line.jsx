import React from 'react';
import Preview from '../components/preview.jsx';
import Editor from '../components/editor.jsx';

class Line extends React.Component {
	display(visible) {
		return { display: visible ? 'block' : 'none' };
	}
	render() {
		return (
			<div className="line">
				<Preview
					onClick={this.props.onClick}
					style={this.display(!this.props.editable)}
				>
					{this.props.html}
				</Preview>
				<Editor
					onChange={this.props.onChange}
					onBlur={this.props.onBlur}
					onKeyDown={this.props.onKeyDown}
					onPaste={this.props.onPaste}
					style={this.display(this.props.editable)}
					value={this.props.markdown}
				/>
			</div>
		);
	}
};

Line.propTypes = {
  html: React.PropTypes.string,
  markdown: React.PropTypes.string,
  text: React.PropTypes.string,
  editable: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func.isRequired,
};

module.exports = Line;
