import { GET_CARD } from "../types";

export default function user(state = {}, action = {}) {
    switch (action.type) {
        case GET_CARD:
            return action.card;
        default:
            return state;
    }
}