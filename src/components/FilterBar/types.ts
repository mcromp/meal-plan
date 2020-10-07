export type FilterId =
 | "BURGERSANDWICH"
 | "BEVERAGE"
 | "CHICKENFISH"
 | "DESSERTSHAKE"
 | "SNACKSIDE"
 | "BREAKFAST"
 | "FAVORITES";

export type Filter = {
 id: FilterId;
 name: string;
 selected: boolean;
};
