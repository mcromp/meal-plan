import { CalendarItem, FoodItem } from "../../types";

export interface DayBoardItemProps {
  calendarItem: CalendarItem;
  fooddata: FoodItem[];
  handleItemCardClick: (id: string, number: number) => void;
}
