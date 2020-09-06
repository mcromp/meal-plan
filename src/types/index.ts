export interface FoodItem {
  ITEM: string;
  CAL: string;
  PRICE: string;
  CATEGORY: string;
  ID: string;
}

export interface User {
  id: string;
  favList: string[];
  name: string;
}

export interface CalendarItem {
  id: string;
  date: string;
  quantity: number;
  user: string;
}

export type FilterId =
  | "BURGERSANDWICH"
  | "BEVERAGE"
  | "CHICKENFISH"
  | "DESSERTSHAKE"
  | "SNACKSIDE"
  | "BREAKFAST"
  | "FAVORITES";

export interface Filter {
  id: FilterId;
  name: string;
  selected: boolean;
}
