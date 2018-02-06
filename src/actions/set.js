import { SET_CODE } from "../types";

export const Code = code => ({
    type: SET_CODE,
    code
});


export const SetCode = setCode => dispatch =>
dispatch(Code(setCode));