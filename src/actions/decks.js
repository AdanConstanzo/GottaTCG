import { ADD_DECKS_ON_TYPE } from "../types";
import api from '../api';

export const DecksOnType = decks => ({
    type: ADD_DECKS_ON_TYPE,
    decks
});


export const GetDecksBasedOnType = (type) =>
    dispatch => {
        api.deck.GetAllDecksByType(type)
            .then(decks =>{
                console.log(decks);
                const temp = {};
                temp.decks = decks;
                temp.type = type
                dispatch(DecksOnType(temp))
            }
            )
    }