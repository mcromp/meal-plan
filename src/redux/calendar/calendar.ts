// args
// (dateList: string[], id: string)
//fetch content
// fetch( CALENDAR_URL_GETMANY + id, {
//    method: "POST",
//    body: JSON.stringify({ dateList }),
//    headers: {
//     "Content-Type": "application/json",
//    })

export interface CalendarItem {
 menuItems: MenuItems[];
 date: string;
 userId: string;
}

export interface MenuItems {
 foodId: string;
 quantity: number;
}

export interface CalendarJSON {
 _id: string;
 menuItems: MenuItems[];
 date: string;
 userId: string;
 __v: number;
}

export const SET_CALENDAR = "SET_CALENDAR";

export interface SetCalendar {
 type: typeof SET_CALENDAR;
 calendar: CalendarItem[];
}

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

export const calendarReducer = (state = [], action: SetCalendar) => {
 switch (action.type) {
  case SET_CALENDAR:
   return action.calendar;
  default:
   return state;
 }
};
