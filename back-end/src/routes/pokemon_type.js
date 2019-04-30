import express from 'express';

import Types from '../models/Types';

const router = express.Router();

router.get("/all", (req, res) => {
    Types.find()
        .exec((err,types) => {
            if(err) return err;
            if(types.length > 0) return res.status(200).json({ types })
            return res.status(400).json({error: {global: "Empty Set."}});
        })
});

router.get("/one", (req, res) => {
    Types.findOne({ "pokemonType": req.query.type })
        .exec((err, type) => {
            if (err) return err;
            if(type) return res.send({type});
            return res.status(400).json({ error: { global: "No Type Exist." } });
        });
});

module.exports = router;
