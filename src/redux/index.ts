import { combineReducers, createStore } from "redux";
import { defaultFilterList } from "../food_data/defaultFilterList";
import calendarReducer from "./calendar";
import favListReducer from "./favList";
import filterReducer from "./filterList";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  favList: favListReducer,
  filterList: filterReducer,
});
export const store = createStore(rootReducer);
