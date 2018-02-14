import { COLLECTION_DB_ADD } from "../types";

export default function user(state = {}, action = {}) {
    switch (action.type) {
        case COLLECTION_DB_ADD:
            return action.collectionDB;
        default:
            return state;
    }
}