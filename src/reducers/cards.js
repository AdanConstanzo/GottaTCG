import { GET_CARDS } from "../types";

export default function user(state = [{}], action = {}) {
    switch (action.type) {
        case GET_CARDS:
            return action.cards;
        default:
            return state;
    }
}