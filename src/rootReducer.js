import { combineReducers } from "redux";

import user from "./reducers/user";
import set from './reducers/set';
import cards from './reducers/cards';
import card from './reducers/card';
import collection from './reducers/collection';
import myCollection from './reducers/my_collection';
import collectionDB from './reducers/collectionDB';
import deckbuilder from './reducers/deckbuilder';
import quill from './reducers/quill';
import deckEnergyView from './reducers/deckEnergyView';
import decks from './reducers/decks';



export default combineReducers({
  user,
  set,
  cards,
  card,
  collection,
  myCollection,
  collectionDB,
  deckbuilder,
  quill,
  deckEnergyView,
  decks
});
