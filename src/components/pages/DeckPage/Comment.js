import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react'

const imgStyle = {
	width: "40px",
	height: "40px"
}

const MyComment = (props) => (
	<Comment key={props.comment._id} >
		<Comment.Avatar style={imgStyle} src={`/api/users/image/${props.comment.author.profileImage}`} />
		<Comment.Content>
			<Comment.Author as='a'>{props.comment.author.username}</Comment.Author>
			<Comment.Metadata>
				<div>{new Date(props.comment.date).toDateString()}</div>
			</Comment.Metadata>
			<Comment.Text>{props.comment.text}</Comment.Text>
			{/* Replay action */}
			{/* <Comment.Actions>
				<Comment.Action>Reply</Comment.Action>
			</Comment.Actions> */}
		</Comment.Content>
	</Comment>
)
MyComment.propTypes = {
	comment: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		author: PropTypes.shape({
			username: PropTypes.string.isRequired,
			profileImage: PropTypes.string.isRequired
		}).isRequired,
		date: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	}).isRequired,
};
export default MyComment;