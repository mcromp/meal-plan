// import { createStore } from "redux";

import { defaultFilterList } from "../food_data/defaultFilterList";
import { dummyUser } from "../food_data/dummyUser";
import { combineReducers, createStore } from "redux";
import calendarReducer from "./calendar";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  // calendarReducer
  //  filterList Reducer
  //  userReducer
});
export const store = createStore(calendarReducer);
