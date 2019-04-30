import express from 'express';
import mongoose from 'mongoose';

import CardCollection from '../models/CardCollection';
import authenticate from "../middlewares/authenticate";
import parseErrors from "../utils/parseErrors";



const router = express.Router();
router.use(authenticate);

function deleteCard(req, res) {
    const { collectionId } = req.body;
    CardCollection
        .findOneAndRemove({
            _id: mongoose.Types.ObjectId(collectionId)
        })
        .exec((err) => {
            if (err) return res.send(err);
            return res.status(200).json({ collection: { quantity: 0, collectionId: null } });
        })
}

function checkNumber (req, res, next) {
    req.body.quantity = parseInt(req.body.quantity, 10) || 0;
    if (req.body.quantity === 0 && req.body.collectionId) {
        deleteCard(req,res);
    } else if (req.body.quantity > 0 ) {
        next();
    } else {
        res.status(400).json({ errors: "Error" })
    }
}



router.post("/setValueToCard",checkNumber, (req,res) => {
    const { quantity, collectionId } = req.body;
    CardCollection
        .findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(collectionId)},
            { $set: { quantity } },
            { new: true }
        )
        .exec((err, id) => {
            if (err) return res.send(err);
            if (id)
                return res.status(200).json({ collection: { quantity, collectionId } })
            return res.status(404).json({ error: { global: "No Collection Found." } })
        });
});

router.post("/createCollection",checkNumber, (req, res) => {
    const { id, quantity, set_code, image_url, name } = req.body;
    const collection = new CardCollection({
        id,
        quantity,
        UserId: req.currentUser._id,
        set_code,
        image_url,
        name
    });
    collection
        .save()
        .then(collectionRecord => {
            res.status(200).json({ collection: { quantity, collectionId: collectionRecord._id } });
        })
        .catch(err => {
            res.status(400).json({ errors: parseErrors(err.errors) })
        }
        );
});

router.get("/getQuantity", (req, res) => {
    CardCollection.findOne(
        {
            UserId: req.currentUser._id,
            id: req.query.id
        })
        .exec((err, collection) => {
            if (err) return err;
            if (collection) return res.status(200).json({ collection: { quantity: collection.quantity, collectionId: collection._id } })
            return res.status(200).json({ collection: { quantity: 0, collectionId: null } });
        })
});

router.get('/getCollection', (req, res) => {
    CardCollection.find(
        { 
            UserId: req.currentUser._id
        })
        .sort(
            {
                id: 1
            }
        )
        .exec((err, collection) => {
            if(err) return err;
            if (collection.length > 0) return res.status(200).json({ collection })
            return res.status(404).json({ error: { global: 'Invalid User.' } });
        })
})

export default router;