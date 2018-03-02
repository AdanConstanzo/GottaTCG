import { ADD_CARD, REMOVE_CARD, SUBTRACT_CARD } from "../types";

export const Code = deckbuilder => ({
    type: ADD_CARD,
    deckbuilder
});

export const Remove = deckbuilder => ({
    type: REMOVE_CARD,
    deckbuilder
});

export const Subtract = deckbuilder => ({
    type: SUBTRACT_CARD,
    deckbuilder
});


export const RemoveCard = (CardType,State) => 
    dispatch => {
        const ConstState = Object.assign({}, State);
        delete ConstState[CardType.type][CardType.id]
        dispatch(Remove(ConstState));
    }

export const SubtractCard = (CardType,State) => 
    dispatch => {
        const ConstState = Object.assign({}, State);
        const ConstCardType = CardType;
        ConstState.Count[CardType.type] -= 1;
        if (ConstState[CardType.type][CardType.id].quantity === 1)
            dispatch(RemoveCard(ConstCardType,ConstState));
        else {
            ConstState[CardType.type][CardType.id].quantity -= 1;
            dispatch(Subtract(ConstState));
        }
        
    }

export const AddCard = (CardType,State) => 
    dispatch => {
        const ConstState = Object.assign({}, State);
        const ConstCardType = CardType;
        ConstState.Count[CardType.type] += 1;
        if (ConstState[CardType.type][CardType.id] ) {
            ConstState[CardType.type][CardType.id].quantity += 1;
        } else {
            ConstCardType.quantity = 1;
            ConstState[CardType.type][CardType.id] = ConstCardType;
        }
        dispatch(Code(ConstState));
    }