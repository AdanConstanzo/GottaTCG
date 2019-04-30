import express from 'express';
import mongoose from 'mongoose';

import Voting from '../models/Voting';
import { AuthNull } from '../middlewares/auth';
import authentication from '../middlewares/authenticate';

const router = express.Router();


/**
 * @description returns value of voiting of current deck. if no voiting, value is null.
 * @requires some user authentication to avoid null return value.
 * @param {String} deckId: id of the deck
 */
router.get('/lookVote', AuthNull, (req,res) => {
    if (req.currentUser) {
        return Voting.findOne({ 
            deckId: mongoose.Types.ObjectId(req.query.deckId),
            userId: mongoose.Types.ObjectId(req.currentUser._id)
        })
            .exec((err, obj) => {
                if (err) return res.send(err)
                if (obj) return res.status(200).json({ vote: { value: obj.votingValue} });
                return res.status(200).json({ vote: { value: null }});
            })
    }
    return res.status(200).json({ vote: { value: null } });
})

// function to set votes to either like, dislike or delete the like object.
// invoked from post('/vote')
const setVote = (req,res) =>{
    if( req.query.value !== null ) {
        return Voting.findOneAndUpdate({
            deckId: req.query.deckId,
            userId: mongoose.Types.ObjectId(req.currentUser._id)
        }, { $set: { votingValue: req.query.value } })
            .exec(() => res.status(200).json({vote: {
                message: "Added value",
                value: req.query.value
            }}))
    }
    return Voting.findOneAndRemove({ deckId: req.query.deckId, userId: mongoose.Types.ObjectId(req.currentUser._id) })
        .exec(() => res.status(200).json({vote: {
            message: "Deleted like."
        }}));
}

// function to create votes, invoked form post('/vote')
const createVote = (req, res) => {
    const { deckId } = req.query;
    const vote = new Voting({
        deckId,
        votingValue: req.query.value,
        userId: req.currentUser._id
    })
    return vote
        .save()
        .then(voteObj => res.status(200).json({vote: voteObj}))
}

/**
 * @description Voiting route that either creates a vote or sets it.
 * @requires user account autentication
 * @param {String} deckId : id of the current deck
 * @param {String} value : voiting value, 0 == dislike, 1 == like, null == delete
 */
router.post('/vote', authentication, (req, res) => {
    const { deckId } = req.query;
    req.query.value = JSON.parse(req.query.value);
    console.log(req.query);
    Voting.findOne({ deckId, userId: mongoose.Types.ObjectId(req.currentUser._id)})
        .exec((err, obj) => {
            if(err) res.send(err);
            if (obj) return setVote(req,res);
            return createVote(req,res);
        })
});


router.get('/voteCount', (req, res) => {
    const { deckId } = req.query;
    let number = 0;
    Voting.find({ deckId, votingValue: true })
        .count()
        .exec((err, count) => {
            number = count;
            Voting.find({ deckId, votingValue: false })
            .count()
            .exec((err, sub) => {
                number -= sub;
                res.status(200).json({ count: number });
            })
        })
})

export default router;