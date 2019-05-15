import express from 'express';

import Comment from '../models/Comment';
import authentication from '../middlewares/authenticate'; 

const router = express.Router();

// route to create a comment
router.post('/', authentication, (req, res) => {
	const { deckId, text } = req.body;
	
	// constructing a comment
	const comment = new Comment();
	comment.text = text
	comment.deckId = deckId;
	// deconstructing autenticated user
	const { _id } = req.currentUser;
	comment.author = _id
	// saving comment
	return comment
		.save()
		.then(comment_response => {
			comment.populate({ path: 'author', select:'username profileImage' }, (err) => {
				if (err) {
					return res.status(400).json({ error: { global: "Error occured when populating" } });
				}
				return res.status(201).json({ comment_response })
			 });
		})
		.catch(() => res.status(400).json({ error: { global: "Unsuccessful saving a comment." } }));
});

// route to collect all comments with deckId
router.get('/', (req, res) => {
	const { deckId } = req.query;
	
	Comment
	.find({ deckId })
	.populate({ path: 'author', select:'username profileImage' })
	.sort('-date')
	.exec( (error, comments) => {
		if (error) {
			return res.status(400).json({ error: { global: `Error occured when collecting comments for ${deckId}` } });
		}
		return res.status(200).json({ comments });
	});
});

export default router;