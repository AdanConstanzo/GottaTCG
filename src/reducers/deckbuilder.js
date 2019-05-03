import Dinero from 'dinero.js';

import { ADD_CARD, REMOVE_CARD, SUBTRACT_CARD, CLEAR_DECK_STATE, SET_COST, SET_CARDS } from "../types";

const empty = {
    'Pokémon': [],
    'Trainer': [],
    'Energy': [],
    'Count': {
        'Pokémon': 0,
        'Trainer': 0,
        'Energy': 0
    },
    'Cost': Dinero({ amount:0 })
}

export default function user(state = empty, action = {}) {
    switch (action.type) {
        case ADD_CARD:
        case REMOVE_CARD:
        case SUBTRACT_CARD:
        case CLEAR_DECK_STATE:
        case SET_COST:
        case SET_CARDS:
            return action.deckbuilder;
        default:
            return state;
    }
}