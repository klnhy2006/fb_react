<!DOCTYPE html>
<html>
  <head>
    <meta charset = "UTF-8" />
    <title>Hello World</title>
    <script src = "https://unpkg.com/react@latest/dist/react.js"></script>
    <script src = "https://unpkg.com/react-dom@latest/dist/react-dom.js"></script>
    <script src = "https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
	<link type = "text/css" href = "style.css" rel = "stylesheet">
  </head>
  <body>
    <div id="root"></div>
	
    <script type="text/babel">
		var List = React.createClass({
		
			getInitialState:function(){
				return {
					items:[],
					text:'hahahahahah'
				};
			},
			
			ChangeText: function(newText){
				this.setState({text: newText});
			},
			
			handleClick:function(e){
				e.preventDefault();
				var newItem = {
					text: this.state.text,
					id: Date.now()
				};
				this.setState((prevState) => ({items: prevState.items.concat(newItem),text: ''}));
			},
		
			render: function(){
				return( 
					<div>
						<InputArea onChange = {this.ChangeText} value = {this.state.text}/>
						<Button onClick = {this.handleClick} type="Post"/>
						<Items items = {this.state.items}/>
					</div>
				);
			}	
		});
		
		var InputArea = React.createClass({
	
			handleChange:function(e){
				var newText = e.target.value;
				this.props.onChange(newText);
			},
			
			render:function(){
				return(
					<div>
					<textarea col ="5" row ="22" onChange = {this.handleChange} value = {this.props.value}></textarea>
					<p>{this.props.value}</p>
					</div>
				);
			}
		});
		
		var Button = React.createClass({
			handleClick: function(e){
				this.props.onClick(e);
			},
		
			render: function(){
				return(
					<button onClick = {this.handleClick}>{this.props.type}</button>
				);
			}
		});
		
		var Items = React.createClass({
			getInitialState:function(){
				return{
					showComment:"false",
					commentLevel:"firstLayer"
				};
			},
			handleClickS:function(e){
				e.preventDefault();
				this.setState({
					showComment:"true"
				});
			},
			
			render: function(){
				return(
					<div>
						{this.props.items.map(item => (
							<div key = {item.id}>
								<p>{item.text}</p>
								<Button onClick = {this.handleClickS} type="comment"/>
								<Comments showComment = {this.state.showComment}/>
							</div>
							)
						)}
					</div>
				);
			}
		});
		
		

		var Comments = React.createClass({

			getInitialState:function(){
				return{
					text:"first comment",
					showComment:"false",
					items:[]
				};
			},
			
			ChangeText: function(newText){
				this.setState({text: newText});
			},
			
			handleClick:function(e){
				e.preventDefault();
				var newItem = {
					text: this.state.text,
					id: Date.now()
				};
				this.setState((prevState) => ({items: prevState.items.concat(newItem),text: ''}));
			},
			
			render: function(){
				if (this.props.showComment === "true" ){
					var comments = {
						<InputArea onChange = {this.ChangeText} value = {this.state.text}/> 
						<Button onClick = {this.handleClick} type="Post"/>
						<CommentItems items = {this.state.items}>
					};
				}
				else
					return null;
				
				return (
					<div>
						{comments}
					</div>
				);
			}
		});
		
		var CommentItems = React.createClass({
			getInitialState:function(){
				return{
					showComment:"false",
					commentLevel:"firstLayer"
				};
			},
			handleClick:function(e){
				e.preventDefault();
				this.setState({
					showComment:"true"
				});
			},
			
			render: function(){
				return(
					<div>
						{this.props.items.map(item => (
							<div key = {item.id}>
								<p>{item.text}</p>
								<Button onClick = {this.handleClick} type="reply"/>
								<SecondaryComments showComment = {this.state.showComment}/>
							</div>
							)
						)}
					</div>
				);
			}
		});
		
		
		var SecondaryComments = React.createClass({
			getInitialState:function(){
				return{
					text:"second comments",
					items:[]
				};
			},
			
			ChangeText: function(newText){
				this.setState({text: newText});
			},
			
			handleClick:function(e){
				e.preventDefault();
				var newItem = {
					text: this.state.text,
					id: Date.now()
				};
				this.setState((prevState) => ({items: prevState.items.concat(newItem),text: ''}));
			},
			
			render:function(){
				if (this.props.showComment === "true" ){
					var comments = <InputArea onChange = {this.ChangeText} value = {this.state.text}/> ;
				}
				else
					return null;
					
				return(
					<div>
						{comments}
						<Button onClick = {this.handleClick} type="Post"/>
						<CommentItemsS items = {this.state.items}/>
					</div>
				);
			}
		});
		
		var CommentItemsS = React.createClass({
			render: function(){
				return(
					<div>
						{this.props.items.map(item => (
							<div key = {item.id}>
								<p>{item.text}</p>
							</div>
							)
						)}
					</div>
				);
			}
		});
		
	
		ReactDOM.render(
		<List/>,
		document.getElementById('root')
		);
    </script>
  </body>
</html>