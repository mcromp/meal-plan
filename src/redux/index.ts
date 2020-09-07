import { combineReducers, createStore } from "redux";
import { defaultFilterList } from "../food_data/defaultFilterList";
import calendarReducer from "./calendar";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  // calendarReducer
  //  filterList Reducer
  //  userReducer
});
export const store = createStore(calendarReducer);
