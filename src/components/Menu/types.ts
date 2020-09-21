import { MenuItem, CalendarItem } from "../../types";

export interface MenuCardProps {
 item: MenuItem;
 addCalendar: (id: string, number: number) => void;
 disableCheck: (id: string) => boolean | undefined;
}

export interface MenuBoardProps {
 handleClick: (id: string, number: number) => void;
 calendar: CalendarItem[];
}
