import React from 'react';

class Preview extends React.Component{
	render(){
		return (
			<div className="line-preview" {...this.props}>
        <span dangerouslySetInnerHTML={{ __html: this.props.children }} />
			</div>
		);
	}
};

module.exports = Preview;
