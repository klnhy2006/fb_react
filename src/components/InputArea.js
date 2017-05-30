import React from 'react';

var InputArea = React.createClass ({
	handleChange:function (e) {
		var newText = e.target.value;
		this.props.onChange(newText);
	},
	
	render:function(){
		return(
			<textarea col ="5" row ="22" 
			onChange = {this.handleChange} 
			value = {this.props.value}></textarea>
		);
	}
});

export default InputArea;