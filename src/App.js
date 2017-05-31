import React from 'react';
import InputArea from './components/InputArea.js';
import Button from './components/Button.js';
import Post from './components/Post.js';
import Upload from './components/Upload.js';
import SearchBar from './components/SearchBar.js';
import './App.css';
//import {Uploader} from 'react-file-upload';

//this is the container for the entire page, contains the sear
var App = React.createClass( {
	getInitialState:function(){
		return {
			posts:[],
			text:'hahahahahah',
			url:"",
			uploads:[],
			searchText:"",
			searchResults:[],
			selectedIndex: -1
		};
	},
	//for changes in search bar
	onChangeSearch: function (newSearchText) {
		this.setState({searchText: newSearchText});
		var results = [];
		if(newSearchText === ""){
			for (var i=0; i< this.state.posts.length && i<5; i++){
				results.push({text: this.state.posts[i].text, index: this.state.posts[i].index});
			}
		}else{
			for(i=0; i< this.state.posts.length; i++){
				if(this.state.posts[i].text.indexOf(newSearchText) !== -1){
					results.push({text: this.state.posts[i].text, index: this.state.posts[i].index});
				}
			}
		}
		this.setState({searchResults: results});
		//clear everything when starting another search
		if(this.state.selectedIndex !== -1)
			this.setState({selectedIndex: -1});
	},
	//for clearing when search bar looses focus
	clearResults: function () {
		this.setState ({searchResults:[],searchText:""});
	},
	//for showing the post that's clicked on
	showResult: function (postI) {
		this.setState({selectedIndex: postI, searchResults:[],searchText:""});
	},
	
	//for changes in inputarea of a new post
	handleChange: function (newText) {
		this.setState({text: newText});
	},
	//for posting new posts
	handleClick: function () {
		var newPost = {
			text: this.state.text,
			commentText: "",
			comments: [],
			showComment: false,
			uploads: this.state.uploads,
			index: this.state.posts.length,
			liked: false
		};//change uploads here
		this.setState((prevState) => 
		({posts: prevState.posts.concat(newPost),text: '',url:'', uploads:[]}));	
	},
	forPostLikes: function (postI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].liked = stateCopy.posts[postI].liked === false?true:false;
		this.setState(stateCopy);
	},
	
	//for posting photos/videos 
	uploadThings: function() {
		var newUpLoad = {url: this.state.url};
		this.setState((prevState) => 
		({uploads: prevState.uploads.concat(newUpLoad)}));
	},
	
	//for showing comment section of posts[postI]
	showComment: function (postI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].showComment = true;
		this.setState(stateCopy);
	},
	//for changes in inputarea of a new comment
	onChangeComment: function (changedText, postI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].commentText = changedText;
		this.setState(stateCopy);
	},
	//for posting a new comment
	postComment: function (newComments, postI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].comments = newComments;
		stateCopy.posts[postI].commentText ="";
		this.setState(stateCopy);
	},
	forCommentLikes: function (postI, comI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].comments = stateCopy.posts[postI].comments.slice();
		stateCopy.posts[postI].comments[comI] = Object.assign({}, stateCopy.posts[postI].comments[comI]);
		stateCopy.posts[postI].comments[comI].liked = stateCopy.posts[postI].comments[comI].liked === false?true:false;
		this.setState(stateCopy);
	},
	//for showing reply section of posts[postI][comI]
	showReply: function (postI,comI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].comments = stateCopy.posts[postI].comments.slice();
		stateCopy.posts[postI].comments[comI] = Object.assign({}, stateCopy.posts[postI].comments[comI]);
		stateCopy.posts[postI].comments[comI].showReply = true;
		this.setState(stateCopy);
	},
	//for changes in inputarea of a new reply
	onChangeReply: function (changedReply, postI, comI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].comments = stateCopy.posts[postI].comments.slice();
		stateCopy.posts[postI].comments[comI] = Object.assign({}, stateCopy.posts[postI].comments[comI]);
		stateCopy.posts[postI].comments[comI].replyText = changedReply;
		this.setState(stateCopy);
	},
	//for posting a new reply
	postReply: function (newReplies, postI, comI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].comments = stateCopy.posts[postI].comments.slice();
		stateCopy.posts[postI].comments[comI] = Object.assign({}, stateCopy.posts[postI].comments[comI]);
		stateCopy.posts[postI].comments[comI].replies = newReplies;
		stateCopy.posts[postI].comments[comI].replyText = "";
		this.setState(stateCopy);
	},
	
	render: function() {
		var posts = [];
		for(var i=0; i<this.state.posts.length; i++){
			posts.push(<Post postItem={this.state.posts[i]} 
						handleLikes={this.forPostLikes} handleLikesC={this.forCommentLikes}
						onClickCom={this.postComment} onClickRep={this.postReply} 
						onChangeComment={this.onChangeComment} onChangeReply={this.onChangeReply}
						showComments={this.showComment} showReplies={this.showReply}/>);	
		}
		//this is the selected post from search bar
		var result = null;
		if (this.state.selectedIndex !== -1){
			result = posts[this.state.selectedIndex];
		}
		return (
		  <div className="Home-Page">
			<SearchBar searchText={this.state.searchText} onChangeSearch={this.onChangeSearch} 
			results={this.state.searchResults} clearResults={this.clearResults}
			showResult={this.showResult}/>
			{result}
			<div className="Post-Area">
			  <InputArea onChange={this.handleChange} value={this.state.text}/>
			  <Button onClick={this.handleClick} type="Post"/>
			</div>
			 {posts}
		  </div>
		);
	}
});

export default App;

//<Upload url={this.state.url} onChange={this.uploadThings}/>