import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Button } from 'semantic-ui-react'

import api from '../../../api';

class CreateComponenets extends React.Component {
	state ={
		commentBody: "",
		successMessageStatus: false,
		errorMessageStatus: false,
		errorMessage: ""
	};

	submit = () =>{
		const { commentBody } = this.state;
		const { deckId } = this.props;
		const commentObj = {
			text: commentBody,
			deckId 
		}
		if (commentBody.length > 0) {
			api.comments.postComment(commentObj)
			.then(res => {
				this.setState({ successMessageStatus: true, commentBody: "" });
				const copy = this.props.comments;
				copy.unshift(res)
				this.props.modifyComments(copy);
			})
			.catch(res => this.setState({ errorMessage: res.response.data.errors.message, errorMessageStatus: true, commentBody: "" }));
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value, successMessageStatus: false });

	render(){
		const { commentBody, successMessageStatus, errorMessageStatus, errorMessage } = this.state;
		return(
			<Form success error>
        <Form.TextArea value={commentBody} name="commentBody" label='Add a Comment' onChange={this.handleChange} placeholder='Tell us more about you...' />
        <Button onClick={this.submit} >Submit</Button>
				{successMessageStatus && <Message success header='Comment Submitted' content="You successfully commented!" />}
				{errorMessageStatus && <Message error header='Error Occured!' content={errorMessage} />}
			</Form>
		)
	}
}
CreateComponenets.propTypes = {
	deckId: PropTypes.string.isRequired,
	comments: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	modifyComments: PropTypes.func.isRequired
};
export default CreateComponenets;