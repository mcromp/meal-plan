export interface FoodItem {
  ITEM: string;
  CAL: string;
  PRICE: string;
  CATEGORY: string;
  ID: string;
}

export interface CalendarItem {
  id: string;
  quantity: number;
  day?: string;
  user?: string;
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
