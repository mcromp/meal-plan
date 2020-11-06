import { CalendarItem, CalendarJSON } from "../../shared/types";

const SET_CALENDAR = "menu-plan/calendar/SET_CALENDAR";

const reducer = (state = [], action: SetCalendar) => {
 switch (action.type) {
  case SET_CALENDAR:
   return action.calendar;
  default:
   return state;
 }
};

export const setCalendar = (calendarJSON: CalendarJSON[]) => {
 let calendar: CalendarItem[] = [];
 calendar = calendarJSON.map((calendarItem) => {
  const { userId, date } = calendarItem;
  return { userId, menuItems: [...calendarItem.menuItems], date };
 });
 return {
  type: SET_CALENDAR,
  calendar,
 };
};

export interface SetCalendar {
 type: typeof SET_CALENDAR;
 calendar: CalendarItem[];
}
export default reducer;
