import { FoodItem, Filter, CalendarItem } from "../../types";

export interface FoodCardProps {
  item: FoodItem;
  addCalendar: (id: string, number: number) => void;
  disableCheck: (id: string) => boolean | undefined;
}

export interface FoodCardListProps {
  fooddata: FoodItem[];
  filterList: Filter[];
  handleClick: (id: string, number: number) => void;
  calendar: CalendarItem[];
}
