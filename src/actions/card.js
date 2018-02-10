import { GET_CARDS, GET_CARD } from "../types";
import api from '../api';

export const SetCards = cards => ({
    type: GET_CARDS,
    cards
});

export const SetCard = card => ({
    type: GET_CARD, 
    card
});

export const SetCurrentCard = cardId => dispatch =>
    dispatch(SetCard(cardId));

export const GetCardsBySet = setCode => dispatch =>
    api.cards.getCardsFromSet(setCode)
        .then(cards => 
            dispatch(SetCards(cards))
        );