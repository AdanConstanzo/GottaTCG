import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: String, required: true },
    set_code: { type: String, required: true },
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    quantity: { type: Number, required: true },
    UserId: { type: String, required: true }
});

module.exports = mongoose.model('CardCollection', schema);