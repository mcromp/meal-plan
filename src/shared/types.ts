export interface CalendarItem {
 menuItems: CalendarMenuItem[];
 date: string;
 userId: string;
}

export type CalendarMenuItem = {
 foodId: string;
 quantity: number;
 _id?: string;
};

export interface MenuItemJSON {
 ITEM: string;
 CAL: string;
 PRICE: string;
 CATEGORY: string;
 ID: string;
}

export interface CalendarJSON {
 _id: string;
 menuItems: CalendarMenuItem[];
 date: string;
 userId: string;
 __v: number;
}

export type UserJSON = {
 _id: string;
 favList: string[];
 username: string;
 createdAt: string;
 updatedAt: string;
 __v: number;
};
export type User = {
 id: string;
 favList: string[];
 username: string;
};

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

export enum Weekdays {
 "Sun",
 "Mon",
 "Tues",
 "Wed",
 "Thur",
 "Fri",
 "Sat",
}
export enum MonthNames {
 "Jan",
 "Feb",
 "Mar",
 "Apr",
 "May",
 "June",
 "July",
 "Aug",
 "Sept",
 "Oct",
 "Nov",
 "Dec",
}

export type WeekDay = {
 month: string;
 day: string;
 date: string;
 year: string;
 dateId: string;
};
