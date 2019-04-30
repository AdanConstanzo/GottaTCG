import express from 'express';
import mongoose from 'mongoose';

import authentication from '../middlewares/authenticate'; 

import Deck from '../models/Decks';
import Types from '../models/Types'

const router = express.Router();

function checkDeck(deck) {
   return ((Object.keys(deck.Count)
       .reduce((val, num) => (deck.Count[num] + val),0) ) > 0 ) 
}

const checkRotation = (rotation) => {
    const Rotation = ["Standard", "Expanded", "Unlimited"]
    return Rotation.filter(val => val === rotation).length
}

const sendResponseError = (res, message, code) => res.status(code).json({ error: { global: message } })

/* creates a deck. Requires deckbuilder object, deck name,
** and user autentication. */
router.post('/', authentication, (req, res) => {
    const { deckbuilder, name, rotation } = req.body;
    
    if (!checkDeck(deckbuilder)){
        return sendResponseError(res, "Missing Deck", 400);
    } else if (name.length  === 0) {
        return sendResponseError(res, "Missing Name For Deck", 400);
    } else if ((rotation.length === 0) || (!checkRotation(rotation))) {
        return sendResponseError(res, "Missing Rotation", 400)
    }

    const tempDeck = new Deck();
    tempDeck.deck = deckbuilder;
    tempDeck.userId = req.currentUser._id;
    tempDeck.name = name;
    tempDeck.cardCount = deckbuilder.Count['Pokémon'] + deckbuilder.Count.Energy + deckbuilder.Count.Trainer;
    tempDeck.rotation = rotation;
    return tempDeck
        .save()
        .then(deck => res.status(201).json({ deck }))
        .catch(() => res.status(400).json({ error: { global: "Something went wrong" } }));
});

router.put('/', authentication, (req, res, next) => {
  const { deckbuilder, name, rotation, _id } = req.body;
  
  Deck.findByIdAndUpdate({_id}, {
    deck: deckbuilder,
    name,
    rotation
  }, { new: true }, (err, Update) => {
    if (err) {
      return res.status(400).json({ error: { global: "Something went wrong" } });
    }
    return res.status(201).json({ deck: Update });
  });

})


// Finds one deck with deck _id
router.get('/findById', (req, res, next) => {
    const { id } = req.query
    Deck.findOne({_id: mongoose.Types.ObjectId(id) })
        .exec((err, deck) => {
            if (err) { return next(err) }
            if (deck) { return res.status(200).json({ deck }) }
            return res.status(404).json({ errors: { global: `No deck with the id of ${id}` } })
        })    
})

// Finds all decks based on current user logged in.
router.get('/getAllDecks', authentication, (req, res, next) => {
    Deck.find({ userId: req.currentUser._id })
        .exec((err, decks) => {
            if (err) { return next (err)}
            return res.status(200).json({ decks })
        });
});

// Find all decks based on UserId
router.get('/getUserDecks', (req, res, next) => {
    const { userId } = req.query
    Deck.find({ userId })
        .exec((err, decks) => {
            if (err) { return next(err) }
            return res.status(200).json({ decks });
        });
});

// Finds all decks.
router.get('/getAll', (req, res) => {
    Deck.find()
        .exec((err, decks) => {
            if (err) {return res.status(500).json({err}) }
            return res.status(200).json({ decks });
        });
});

// Finds a deck based on color type.
router.get('/getAllByType', (req, res) => {
    const { pokemonType } = req.query;
    Deck.find({ "deck.deckEnergyView.pokemonType": pokemonType })
        .exec((err, decks) => {
            if (err) {return res.status(500).json({err})}
            return res.status(200).json({ decks }); 
        })
})


/**
 * Grabs decks and sets a key to avaliable types.
 * @param limit- sets a limit to decks (default is set to 5)
 */
router.get('/getAllTypesByLimit', (req, res) => {
    let { limit } = req.query;
    if (limit === undefined)
        limit = 5;
    Types
        .find()
        .exec((err, types) => {
            let count = 0
            const Decks = {};
            types.forEach(element => {
                Deck
                .find({"deck.deckEnergyView.pokemonType": element.pokemonType})
                .limit(Number(limit))
                .exec((error, decks) => {
                    count += 1;
                    Decks[element.pokemonType] = decks
                    if (count === (types.length)) {
                        res.status(200).json({Decks});
                    }
                })
            });
        })
})

export default router;