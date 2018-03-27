import { SET_QUILL_VALUE } from "../types";


export default function user(state = "", action = {}) {
    switch (action.type) {
        case SET_QUILL_VALUE:
            return action.quill;
        default:
            return state;
    }
}