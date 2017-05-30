import React from 'react';

var SearchBar = React.createClass({
	handleChange: function (e) {
		e.preventDefault();
		this.props.onChangeSearch (e.target.value);
	},
	//for selecting a post from results
	handleClick: function (e) {
		e.preventDefault();
		this.props.showResult (e.target.name);
	},
	render: function () {
		var resultBox = [];
		for (var i=0; i<this.props.results.length; i++){
			resultBox.push(<button name={this.props.results[i].index} onMouseDown={this.handleClick}>{this.props.results[i].text}</button>);
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