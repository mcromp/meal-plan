import { CalendarItem } from "../types";

const initalState = {
  calendar: [],
};

//type shit
// export const ADD_CALENDAR_ITEM = "ADD_CALENDAR_ITEM";
// export const REMOVE_CALENDAR_ITEM_BY_ID = "REMOVE_CALENDAR_ITEM_BY_ID";
// type ModifyCalendarPayload = number;
// type CalendarAction = { type: string; payload: string | ModifyCalendarPayload };

export default function calendarReducer(
  calendar: CalendarItem[] = initalState.calendar,
  action: any
) {
  switch (action.type) {
    case "ADD_CALENDAR_ITEM":
      return [...calendar, action.payload];
    case "REMOVE_CALENDAR_ITEM_BY_ID":
      const filteredCalendar = calendar.filter(
        (item) => item.id !== action.payload
      );
      return [...filteredCalendar];
    case "MODIFY_CALENDAR_ITEM_QUANTITY":
      const prevState = [...calendar];
      prevState[action.payload.index].quantity = action.payload.quantity;
      return prevState;
    default:
      return calendar;
  }
}

export const addCalendarItem = (newCalendarItem: CalendarItem) => ({
  type: "ADD_CALENDAR_ITEM",
  payload: newCalendarItem,
});

export const removeCalendarItemById = (id: string) => ({
  type: "REMOVE_CALENDAR_ITEM_BY_ID",
  payload: id,
});

export const modifyCalendarItemQuantity = (
  index: number,
  quantity: number
) => ({
  type: "MODIFY_CALENDAR_ITEM_QUANTITY",
  payload: {
    index,
    quantity,
  },
});
