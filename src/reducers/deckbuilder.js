import { ADD_CARD, REMOVE_CARD, SUBTRACT_CARD, CLEAR_DECK_STATE, CHANGE_DECK_ENERGY_VIEW } from "../types";

const empty = {
    'Pokémon': {},
    'Trainer': {},
    'Energy': {},
    'Count': {
        'Pokémon': 0,
        'Trainer': 0,
        'Energy': 0
    },
    'DeckEnergyView': {
        "imageUrl": "/images/type/Dragon.png",
        "pokemonType": "Dragon",
    }
}

export default function user(state = empty, action = {}) {
    switch (action.type) {
        case ADD_CARD:
        case REMOVE_CARD:
        case SUBTRACT_CARD:
        case CHANGE_DECK_ENERGY_VIEW:
        case CLEAR_DECK_STATE:
            return action.deckbuilder;
        default:
            return state;
    }
}