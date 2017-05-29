import React, { Component } from 'react';

var Button = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		this.props.onClick();
	},

	render: function(){
		return(
			<button onClick = {this.handleClick}>{this.props.type}</button>
		);
	}
});

export default Button;