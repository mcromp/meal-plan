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
