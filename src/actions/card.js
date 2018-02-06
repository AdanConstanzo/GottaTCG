import { GET_CARDS } from "../types";
import api from '../api';

export const SetCards = cards => ({
    type: GET_CARDS,
    cards
});


export const GetCardsBySet = setCode => dispatch =>
    api.cards.getCardsFromSet(setCode)
        .then(cards => 
            dispatch(SetCards(cards))
        );