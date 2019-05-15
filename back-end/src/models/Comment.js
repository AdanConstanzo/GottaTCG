import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const schema = new Schema({
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck' },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model("Comment", schema);
