import React from 'react';
import Button from './Button.js';
import Comment from './Comment.js';
import InputArea from './InputArea.js';

var Post = React.createClass({
	//following are for comments
	showComments: function () {
		this.props.showComments(this.props.postItem.index);
	},
	//adding a new comment when post-comment button is pressed
	handleClick: function() {
		var newComment = {
			text: this.props.postItem.commentText,
			replyText: "",
			replies: [],
			showReply: false,
			index: this.props.postItem.comments.length
		};
		//copy original comment array, append new comment
		var itemCopy = Object.assign({}, this.props.postItem);
		itemCopy.comments = itemCopy.comments.slice();
		itemCopy.comments.push(newComment);
		this.props.onClickCom(itemCopy.comments, this.props.postItem.index);
	},
	handleChange: function (newText) {
		this.props.onChangeComment(newText, this.props.postItem.index);
	},
	
	//following are for replies
	showReplies: function (i) {
		this.props.showReplies(this.props.postItem.index, i);
	},
	postReply: function (newReplyArray,i) {
		this.props.onClickRep(newReplyArray, this.props.postItem.index, i);
	},
	changeReply: function (changedReply, i) {
		this.props.onChangeReply (changedReply, this.props.postItem.index, i);
	},
	
	render: function(){
		var enableComment;
		var files = [];
		var comments = [];
		for(var i=0; i<this.props.postItem.comments.length; i++){
			comments.push(<Comment commentItem={this.props.postItem.comments[i]} showReplies={this.showReplies} 
							onClick={this.postReply} onChange={this.changeReply}/>);
		}
		for(i=0; i<this.props.postItem.uploads.length; i++){
			files.push(<img alt="lol" src={this.props.postItem.uploads[i].url}/>);
		}
		//if there is no comment, then don't show anything
		if(this.props.postItem.showComment === true){
			enableComment = (<div>
							 <InputArea onChange={this.handleChange} value={this.props.postItem.commentText}/>
							 <Button onClick={this.handleClick} type="Post Comment"/>
							 {comments}
							</div>);
		}else{
			enableComment = null;
		}
			
		return(
			<div>
				<p>{this.props.postItem.text}{files}<Button onClick={this.showComments} type="Comment"/></p>
				{enableComment}
			</div>
		);
	}
});

export default Post;