import { Filter } from "../components/FilterBar/types";

const initalState: Filter[] = [
 { id: "FAVORITES", name: "User Favorites", selected: false },
 { id: "BURGERSANDWICH", name: "Burger and Sandwhich", selected: false },
 { id: "BEVERAGE", name: "Beverage", selected: false },
 { id: "CHICKENFISH", name: "Chicken and Fish", selected: false },
 { id: "DESSERTSHAKE", name: "Dessert and MilkShake", selected: false },
 { id: "SNACKSIDE", name: "Snack and Side", selected: false },
 { id: "BREAKFAST", name: "Breakfast", selected: false },
];

const filterReducer = (filterList: Filter[] = initalState, action: any) => {
 switch (action.type) {
  case "SET_FILTER":
   const { filter, boo } = action.payload;
   const prevState = [...filterList];
   prevState[prevState.indexOf(filter)].selected = boo;
   return prevState;
  case "RESET_FILTER":
   return filterList.map((filter: Filter) => {
    filter.selected = false;
    return filter;
   });
  default:
   return filterList;
 }
};

export const setFilter = (filter: Filter, boo: boolean) => ({
 type: "SET_FILTER",
 payload: {
  filter,
  boo,
 },
});

export const resetFilter = () => ({
 type: "RESET_FILTER",
});

export default filterReducer;
