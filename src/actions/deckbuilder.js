import Dinero from 'dinero.js';


import { ADD_CARD, REMOVE_CARD, SUBTRACT_CARD, CLEAR_DECK_STATE, CHANGE_DECK_ENERGY_VIEW, SET_COST, SET_CARDS } from "../types";

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

export const SetCards = deckbuilder => ({
  type: SET_CARDS,
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
    'Pokémon': [],
    'Trainer': [],
    'Energy': [],
    'Count': {
      'Pokémon': 0,
      'Trainer': 0,
      'Energy': 0
    },
    'Cost':  Dinero({ amount:0 })
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
    ConstState.Cost = ConstState.Cost.subtract(Dinero({ amount: Number(CardType.price.replace(".", "")) }));
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
    
    if (ConstState[CardType.type].length === 0) {
      ConstState[`${CardType.type}-order`] = CardType.id;
    }
		ConstState.Count[CardType.type] += 1;
		if (CardType.price != null) {
			ConstState.Cost = ConstState.Cost.add(Dinero({ amount: Number(CardType.price.replace(".", "")) }));
    }
    let indexOfCard = null;
    ConstState[CardType.type].forEach((ele, i) => {
      if (ele.id === CardType.id) {
        indexOfCard = i;
      }
    });

    if (indexOfCard !== null) {
      ConstState[CardType.type][indexOfCard].quantity += 1;
    } else if (indexOfCard === null) {
      ConstCardType.quantity = 1;
      ConstState[CardType.type].push(CardType);
    }
    console.log("AddCard state: ", ConstState)
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
    ConstState.Cost = Dinero({ amount: Number(Cost.replace("$","").replace(".","")) });
    dispatch(SettingCost(ConstState));
  }
export const SetStateCards = (Cards, type, State) => 
  dispatch => {
    const ConstState = Object.assign({}, State);
    ConstState[type] = Cards;
    console.log(ConstState[type])
    console.log("SetStateCards new cards!: ", ConstState);
    dispatch(SetCards(ConstState));
  }

export const returnDate = (isoDate) =>{
  const date = new Date(isoDate);
  const string = "";
  return string.concat(date.getMonth() + 1, "/", date.getDate(), "/", date.getFullYear());
}