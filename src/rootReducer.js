import { combineReducers } from "redux";

import user from "./reducers/user";
import set from './reducers/set';
import card from './reducers/card';

export default combineReducers({
  user,
  set,
  card
});
