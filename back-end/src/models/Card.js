import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: String },
    name: { type: String },
    nationalPokedexNumber: { type: Number },
    image_url: { type: String },
    subtype: { type: String },
    supertype: { type: String },
    ability: [Schema.Types.Mixed],
    hp: { type: String },
    retreatCost: [String],
    number: { type: Number },
    artist: { type: String },
    rarity: { type: String },
    series: { type: String },
    pokemonSet: { type: String },
    set_code: { type: String },
    types: [String],
    attacks: [Schema.Types.Mixed],
    weaknesses: [Schema.Types.Mixed],
    resistances: [Schema.Types.Mixed],
    text: { type: String },
    standardLegal: { type: Boolean },
    expandedLegal: { type: Boolean },
    price: { type: Number }
});


module.exports = mongoose.model("Card", schema);
