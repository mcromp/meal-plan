export interface CalendarItem {
 menuItems: MenuItems[];
 date: string;
 userId: string;
}

export interface MenuItems {
 foodId: string;
 quantity: number;
}

export interface MenuItemJSON {
 ITEM: string;
 CAL: string;
 PRICE: string;
 CATEGORY: string;
 ID: string;
}

export interface CalendarJSON {
 _id: string;
 menuItems: MenuItems[];
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
