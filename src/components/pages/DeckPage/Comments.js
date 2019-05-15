import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react'

import MyComment from './Comment';
import CreateComments from './CreateComments';

class Comments extends React.Component {
	state ={
	};

	render(){
		const { comments, deckId } = this.props;
		const divStyle = {
			width: "100%"
		}
		return (
			<div style={divStyle} >
				{comments.length === 0 && <h1>There are no comments!</h1>}
				<CreateComments deckId={deckId} comments={comments} modifyComments={this.props.modifyComments} />
				{comments.length > 0 && 
					<Comment.Group minimal size='large'>
						{comments.map(comment => <MyComment key={comment._id} comment={comment} />)}
					</Comment.Group>
				}
			</div>
		)
	}
}
Comments.propTypes = {
	comments: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	deckId: PropTypes.string.isRequired,
	modifyComments: PropTypes.func.isRequired
};
export default Comments;