import { CalendarItem } from "../../redux/calendar/calendarGet";
import { MenuItem } from "../../redux/menuList/menuList";

export interface MenuCardProps {
 item: MenuItem;
 addCalendar: (id: string, number: number) => void;
 disableCheck: (id: string) => boolean | undefined;
}

export interface MenuBoardProps {
 handleClick: (id: string, number: number) => void;
 calendar: CalendarItem[];
}
