import { FoodItem, Filter, CalendarItem } from "../../types";

export interface MenuCardProps {
  item: FoodItem;
  addCalendar: (id: string, number: number) => void;
  disableCheck: (id: string) => boolean | undefined;
}

export interface MenuBoardProps {
  fooddata: FoodItem[];
  handleClick: (id: string, number: number) => void;
  calendar: CalendarItem[];
}
