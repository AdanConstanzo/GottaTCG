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

export const GetCardsBySet = (setCode, State) => 
	dispatch => {
		const ConstState = Object.assign({}, State);
		if (ConstState[setCode] !== undefined) {
			dispatch(SetCards(ConstState));
			console.log("Cached.");
		} else {
			console.log("fetching cards from GetCardBySet")
			api.cards.getCardsFromSet(setCode)
        .then(cards => {
					ConstState[setCode] = cards;
					console.log("Dispathign cards.");
					dispatch(SetCards(ConstState));
				} );
		}
	}

export const SetFilterCards = (filterCode, SetOfCards, State) => 
	dispatch => {
		const ConstState = Object.assign({}, State);
		ConstState[filterCode] = SetOfCards;

		dispatch(SetCards(ConstState));
	}
		