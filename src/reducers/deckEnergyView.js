import { CHANGE_DECK_ENERGY_VIEW } from "../types";

const empty = {
    "imageUrl": "/images/type/Grass.png",
    "pokemonType": "Grass",
}

export default function user(state = empty, action = {}) {
    switch (action.type) {
        case CHANGE_DECK_ENERGY_VIEW:
            return action.deckEnergyView;
        default:
            return state;
    }
}