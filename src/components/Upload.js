import React from 'react';

var Upload = React.createClass({
	handleChange: function(e){
		e.preventDefault();
		var reader = new FileReader();
		var file = e.target.files[0];
		reader.onloadend = () => {this.props.onChange(reader.result);}
		reader.readAsDataURL(file);
	},
	
	render : function(){
		var imagePreview = null;
		
		if (this.props.url){
			imagePreview = (<img src={this.props.url} alt="uploaded" height="10px" width="10px"/>);
		}
		
		return(
			<div>
				<input type = "file" onChange = {this.handleChange} value="lol"/>
				{imagePreview}
			</div>
		);
	}
});

export default Upload;


