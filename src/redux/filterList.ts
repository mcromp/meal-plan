import { Filter } from "../types";

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
    case "ADD_FAV":
      return filterList;
    default:
      return filterList;
  }
};

export default filterReducer;
