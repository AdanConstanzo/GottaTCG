import express from 'express';

import Card from '../models/Card';
import { ReturnSet } from './set';

const router = express.Router();

// finds a set of cards by setCode
router.get("/findSetByCode", (req,res) => {
    Card
        .find({ set_code: req.query.set_code })
        .sort({ number: 1 })
        .exec((err, cards) => {
            if (err) return err;
            if (cards.length > 0) return res.send({ cards });
            return res.status(404).json({ error: { global: "Empty Set" } });
        });
});

// Finds a card by id
router.get("/findCardById", (req, res) => {
    Card.findOne({id: req.query.id}, (err, card) => {
        if(err)  return err;
        if(card)  return res.send({card});
        return res.status(404).json({ error: { global: "No card found." }});
    });
});

// Finds array of cards by name. Using regex.
router.get("/findCardsByName", (req, res) => {
    Card.find({ name: { "$regex": req.query.name, "$options": "i" } }, (err, card) => {
        if (err) return err;
        if (card.length > 0) return res.send({card});
        return res.status(404).json({ error: { global: `No card found with name: ${req.query.name}` } })
    });
});

router.get("/doesCardExist", (req, res) => {
  const { id } = req.query;
  Card
    .findOne({ id })
    .exec((err, cards) => {
      if (err) res.status(500).json({ err })
      return cards ? res.status(200).json({ exist: true }) : res.status(200).json({ exist: false })
    });
})

// checks to see if subset that are given are part of tcg
async function CheckSubSets(set, type, color) {
	const Sets = await ReturnSet(null);
	const Colors = ['Colorless', 'Darkness', 'Dragon', 'Fairy', 'Fighting', 'Metal', 'Grass', 'Fire', 'Psychic', 'Lightning', 'Water']; 
	if (type === 'Pokémon') {
		return [Sets.filter(val => set.indexOf(val.code) !== -1).length !== 0, Colors.filter(val => color.indexOf(val) !== -1).length !== 0]
	} else if (type === 'Energy' || 'Trainer') {
		return [Sets.filter(val => set.indexOf(val.code) !== -1).length !== 0, true];
	}
	return [false, false];
}

// validates our filter request
const ValidateFilter = (req, res, next) => {

	const { sets, type, color } = req.body;
	CheckSubSets(sets, type, color)
		.then((val) => {
			if (val.every(ele => ele === true)) {
				next();
			} else {
				const ErrorCode = ['Missing Set', 'Missing Color Type']
				res.status(500).json({ error: true, message: ErrorCode[val.indexOf(false)] });
			}
		})
		.catch(error => {
			if (error) {
				res.status(500).json({ error });
			}
		});
	
}

// Grabs a set of cards by supertype, set_code array and types array.
router.post('/findCardsByFitler', ValidateFilter, (req, res) => {
	
	const { sets, type, color } = req.body;

	if (type === 'Pokémon') {
		Card
			.find({ supertype: type, set_code: { $in: sets }, types: { $in: color } })
			.exec((error, cards) => {
				if (error) res.status(500).json({ error })
				return cards.length > 0 ? res.status(200).json({ message: "success", cards }) : res.status(200).json({ message: "No Cards with given filters ", cards });
			});
	} else {
		Card
			.find({ supertype: type, set_code: { $in: sets } })
			.exec((error, cards) => {
				if (error) res.status(500).json({ error })
				return cards.length > 0  ? res.status(200).json({ message: "success", cards }) : res.status(200).json({ message: "No Cards with given filters ", cards });
			});
	}
});

export default router;