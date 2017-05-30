import React from 'react';

var Reactions = React.createClass({
	handleChange:function(e){
		var newReaction = e.target.value;
		this.props.onChange(newReaction);
	},
	handleBlur: function (e){
		e.target.value = "";
	},
	render:function(){
		return(
			<div>
				<input type = "text" placeholder = "ur reaction" onChange = {this.handleChange} onBlur = {this.handleBlur}/>
			</div>
		);
	}
});

export default Reactions;