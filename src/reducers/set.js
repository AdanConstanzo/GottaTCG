import { SET_CODE } from "../types";

export default function user(state = "", action = "") {
    switch (action.type) {
        case SET_CODE:
            return action.code.code;
        default:
            return state;
    }
}