import { Filter } from "../../shared/types";

const SET_FILTER = "menu-plan/filterList/SET_FILTER";
const RESET_FILTER = "menu-plan/filterList/RESET_FILTER";

const initalState: Filter[] = [
 { id: "FAVORITES", name: "User Favorites", selected: false },
 { id: "BURGERSANDWICH", name: "Burger and Sandwhich", selected: false },
 { id: "BEVERAGE", name: "Beverage", selected: false },
 { id: "CHICKENFISH", name: "Chicken and Fish", selected: false },
 { id: "DESSERTSHAKE", name: "Dessert and MilkShake", selected: false },
 { id: "SNACKSIDE", name: "Snack and Side", selected: false },
 { id: "BREAKFAST", name: "Breakfast", selected: false },
];

const reducer = (
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

interface SetFiler {
 type: typeof SET_FILTER;
 payload: { filter: Filter; selected: boolean };
}
interface ResetFilter {
 type: typeof RESET_FILTER;
}

type FilterReducerActions = SetFiler | ResetFilter;

export default reducer;
