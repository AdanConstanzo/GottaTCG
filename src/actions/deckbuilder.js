import { ADD_CARD, REMOVE_CARD, SUBTRACT_CARD, CLEAR_DECK_STATE, CHANGE_DECK_ENERGY_VIEW, SET_COST } from "../types";

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

export const DeckEnergyView = deckEnergyView => ({
  type: CHANGE_DECK_ENERGY_VIEW,
  deckEnergyView
})

export const SettingCost = deckbuilder => ({
  type: SET_COST,
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
    'Cost': 0
  }
  dispatch(Clear(empty))
}

export const SetDeckEnergyView = (EnergyObj) =>
  dispatch => dispatch(DeckEnergyView(EnergyObj));

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
    ConstState.Cost = +(Number(ConstState.Cost) - Number(CardType.price)).toFixed(12)
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
    ConstState.Cost = +(Number(ConstState.Cost) + Number(CardType.price)).toFixed(12)
    if (ConstState[CardType.type][CardType.id] ) {
      ConstState[CardType.type][CardType.id].quantity += 1;
    } else {
      ConstCardType.quantity = 1;
      ConstState[CardType.type][CardType.id] = ConstCardType;
    }
    dispatch(Code(ConstState));
  }

export const SetCard = (Card, Count, State) => 
  dispatch => {
    const ConstState = Object.assign({}, State);
    const ConstCardType = Card;
    ConstState.Count[Card.type] += Number(Count); 
    ConstCardType.quantity = Number(Count);
    ConstState[Card.type][Card.id] = ConstCardType;
    dispatch(Code(ConstState));
  }
export const SetCost = (Cost, State) =>
  dispatch => {
    const ConstState = Object.assign({}, State);
    ConstState.Cost = Cost;
    dispatch(SettingCost(ConstState));
  }

export const returnDate = (isoDate) =>{
  const date = new Date(isoDate);
  const string = "";
  return string.concat(date.getMonth() + 1, "/", date.getDate(), "/", date.getFullYear());
}