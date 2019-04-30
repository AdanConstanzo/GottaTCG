import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type: String, required: true },
    deckId: { type: String, required: true },
    votingValue: {type: Boolean, required: true}
});

module.exports = mongoose.model('Voting', schema);