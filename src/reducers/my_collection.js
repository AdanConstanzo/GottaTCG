import { COLLECTION_SET } from "../types";

export default function user(state = [{}], action = {}) {
    switch (action.type) {
        case COLLECTION_SET:
            return action.myCollection;
        default:
            return state;
    }
}