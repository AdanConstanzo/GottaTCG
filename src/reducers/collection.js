import { CARD_QUANTITY_VALUE } from "../types";

export default function user(state = {}, action = {}) {
    switch (action.type) {
        case CARD_QUANTITY_VALUE:
            return action.collection;
        default:
            return state;
    }
}