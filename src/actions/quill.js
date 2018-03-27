import { SET_QUILL_VALUE } from "../types";

export const QuillString = quill => ({
    type: SET_QUILL_VALUE,
    quill
})

export const SetQuillString = (QuillStringVal) =>
    dispatch => {
        dispatch(QuillString(QuillStringVal))
    }