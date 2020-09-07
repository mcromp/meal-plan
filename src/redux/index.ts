import { combineReducers, createStore } from "redux";
import { defaultFilterList } from "../food_data/defaultFilterList";
import calendarReducer from "./calendar";
import favListReducer from "./favList";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  favList: favListReducer,
  //  filterList Reducer
});
export const store = createStore(rootReducer);
