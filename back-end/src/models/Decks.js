import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    deck: { type: Schema.Types.Mixed, required: true },
    date: { type: Date, default: Date.now },
    rotation: { type: String, required: true},
    cardCount: {type: Number, required: true},
    vote: { type: Number, required: true, default: 1 }
}, { minimize: false });



module.exports = mongoose.model("Deck", schema);
