import { ADD_CARD, REMOVE_CARD, SUBTRACT_CARD, CLEAR_DECK_STATE, CHANGE_DECK_ENERGY_VIEW } from "../types";

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

export const Clear = deckbuilder => ({
    type: CLEAR_DECK_STATE,
    deckbuilder
})

export const DeckEnergyView = deckbuilder => ({
    type: CHANGE_DECK_ENERGY_VIEW,
    deckbuilder
})

export const ClearState = () => dispatch =>{
    const empty = {
        'Pokémon': {},
        'Trainer': {},
        'Energy': {},
        'Count': {
            'Pokémon': 0,
            'Trainer': 0,
            'Energy': 0
        },
        'DeckEnergyView': {
            "imageUrl": "/images/type/Dragon.png",
            "pokemonType": "Dragon",
        }
    }
    dispatch(Clear(empty))
}

export const SetDeckEnergyView = (EnergyObj, State) =>
    dispatch => {
        const ConstState = Object.assign({}, State);
        ConstState.DeckEnergyView = EnergyObj;
        dispatch(DeckEnergyView(ConstState));
    }

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