import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    code: { type: String, required: true },
    ptcgo_code: { type: String, required: true },
    name: { type: String, required: true },
    series: { type: String, required: true },
    total_cards: { type: Number, required: true },
    standard_legal: { type: Boolean, required: true },
    symbol_url: { type: String, required: true },
    logo_url: { type: String, required: true },
    expanded_legal: { type: Boolean, required: true },
    release_date: { type: String, required: true },
    number: { type: Number, required: true }
});

module.exports = mongoose.model('Set', schema);