import { CalendarItem, FoodItem } from "../../types";

export interface CheckoutBoardItemProps {
  calendarItem: CalendarItem;
  fooddata: FoodItem[];
  handleItemCardClick: (id: string, number: number) => void;
}
