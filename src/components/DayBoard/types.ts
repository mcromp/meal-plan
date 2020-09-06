import { CalendarItem, FoodItem } from "../../types";

export interface DayBoardItemProps {
  calendarItem: CalendarItem;
  removeItem: (id: string) => void;
  fooddata: FoodItem[];
  addCalendar: (id: string, number: number) => void;
}
