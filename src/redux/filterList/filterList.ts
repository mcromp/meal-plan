import { Filter } from "../../components/FilterBar/types";

const initalState: Filter[] = [
 { id: "FAVORITES", name: "User Favorites", selected: false },
 { id: "BURGERSANDWICH", name: "Burger and Sandwhich", selected: false },
 { id: "BEVERAGE", name: "Beverage", selected: false },
 { id: "CHICKENFISH", name: "Chicken and Fish", selected: false },
 { id: "DESSERTSHAKE", name: "Dessert and MilkShake", selected: false },
 { id: "SNACKSIDE", name: "Snack and Side", selected: false },
 { id: "BREAKFAST", name: "Breakfast", selected: false },
];

const SET_FILTER = "SET_FILTER";
const RESET_FILTER = "RESET_FILTER";

export const setFilter = (filter: Filter, selected: boolean) => ({
 type: SET_FILTER,
 payload: {
  filter,
  selected,
 },
});

export const resetFilter = () => ({
 type: RESET_FILTER,
});

export interface SetFiler {
 type: typeof SET_FILTER;
 payload: { filter: Filter; selected: boolean };
}
export interface ResetFilter {
 type: typeof RESET_FILTER;
}

export type FilterReducerActions = SetFiler | ResetFilter;

const filterReducer = (
 filterList: Filter[] = initalState,
 action: FilterReducerActions
) => {
 switch (action.type) {
  case SET_FILTER:
   const { filter, selected } = action.payload;
   const prevState = [...filterList];
   prevState[prevState.indexOf(filter)].selected = selected;
   return prevState;
  case RESET_FILTER:
   return filterList.map((filter: Filter) => {
    filter.selected = false;
    return filter;
   });
  default:
   return filterList;
 }
};

export default filterReducer;
