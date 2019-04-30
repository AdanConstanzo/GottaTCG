import express from 'express';

import Set from '../models/Sets';

const router = express.Router();

export const ReturnSet = (res) =>  
	Set
		.find()
		.sort({number: -1})
		.exec((err,sets) => {
			if (err) return err;
			if (sets.length > 0  && res !== null) {
				return res.send({ sets });
			} else if (sets.length > 0  && res === null) {
				return sets;
			}
			return res.status(404).json({ error: { global: "No sets found." } });
		});
	

router.get("/getAll", (req, res) => ReturnSet(res));

export default router;