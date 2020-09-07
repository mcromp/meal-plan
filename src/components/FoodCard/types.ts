import { FoodItem, Filter, CalendarItem } from "../../types";

export interface FoodCardProps {
  item: FoodItem;
  addCalendar: (id: string, number: number) => void;
  disableCheck: (id: string) => boolean | undefined;
  favList: string[];
  toggleFav: (id: string) => void;
}

export interface FoodCardListProps {
  fooddata: FoodItem[];
  filterList: Filter[];
  favList: string[];
  handleClick: (id: string, number: number) => void;
  calendar: CalendarItem[];
  toggleFav: (id: string) => void;
}
