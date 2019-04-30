import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    pokemonType: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Type', schema);