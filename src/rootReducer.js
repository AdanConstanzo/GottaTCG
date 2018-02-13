import { combineReducers } from "redux";

import user from "./reducers/user";
import set from './reducers/set';
import cards from './reducers/cards';
import card from './reducers/card';
import collection from './reducers/collection';
import myCollection from './reducers/my_collection';

export default combineReducers({
  user,
  set,
  cards,
  card,
  collection,
  myCollection
});
