import { Filter } from "../../shared/types";

const SET_FILTER = "menu-plan/filterList/SET_FILTER";
const RESET_FILTER = "menu-plan/filterList/RESET_FILTER";

const initalState: Filter[] = [
 { id: "FAVORITES", name: "User Favorites", selected: false },
 { id: "BREAKFAST", name: "Breakfast", selected: false },
 { id: "LUNCH", name: "Lunch", selected: false },
 { id: "DINNER", name: "Dinner", selected: false },
 { id: "DESSERT", name: "Dessert", selected: false },
 { id: "SNACK", name: "Snack", selected: false },
 { id: "DRINK", name: "Drink", selected: false },
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
