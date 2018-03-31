import { ADD_DECKS_ON_TYPE } from "../types";

export default function user(state = {}, action = {}) {
    
    switch (action.type) {
        case ADD_DECKS_ON_TYPE: {
            // if state already has key of type return state.
            if (state[action.decks.type])
                return state;
            
            const obj = {};
            obj[action.decks.type] = action.decks.decks;
            return Object.assign({}, state, obj )
        }
        default: return state;
    }
}