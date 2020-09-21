import { CalendarItem, MenuItem } from "../../types";

export interface CheckoutBoardItemProps {
 calendarItem: CalendarItem;
 handleItemCardClick: (id: string, number: number) => void;
}
