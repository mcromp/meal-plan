import { FoodItem, User, Filter, CalendarItem } from "../../types";

export interface FoodCardProps {
  item: FoodItem;
  addCalendar: (id: string, number: number) => void;
  disableCheck: (id: string) => boolean | undefined;
  user: User;
  toggleFav: (id: string) => void;
}

export interface FoodCardListProps {
  fooddata: FoodItem[];
  filterList: Filter[];
  user: User;
  handleClick: (id: string, number: number) => void;
  calendar: CalendarItem[];
  toggleFav: (id: string) => void;
}
