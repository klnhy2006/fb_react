import React from 'react';

var SearchBar = React.createClass({
	handleChange: function (e) {
		e.preventDefault();
		this.props.onChangeSearch (e.target.value);
	},
	/*handleClick: function (e) {
		ths.props.
	},*/
	render: function () {
		var resultBox = [];
		for (var i=0; i<this.props.results.length; i++){
			resultBox.push(<p /*onClick={this.handleClick}*/>{this.props.results[i]}</p>);
		}
		
		return(
			<div>
				<input type="text" placeholder="search posts" 
				onChange={this.handleChange} value={this.props.searchText}
				onBlur={this.props.clearResults}/>
				{resultBox}
			</div>
		);
	}
});

export default SearchBar;