import { GET_CARDS, GET_CARD, CARD_VALUE } from "../types";
import api from '../api';

export const SetCards = cards => ({
    type: GET_CARDS,
    cards
});

export const SetCard = card => ({
    type: GET_CARD, 
    card
});

export const CardValue = cardValue => ({
    type: CARD_VALUE,
    cardValue
})

export const SetValueToCard = cardId => dispatch =>
    api.card.setValueToCard(cardId)
        .then(cardVal => dispatch(cardVal));

export const SetCurrentCard = cardId => dispatch =>
    dispatch(SetCard(cardId));

export const GetCardsBySet = setCode => dispatch =>
    api.cards.getCardsFromSet(setCode)
        .then(cards => 
            dispatch(SetCards(cards))
        );