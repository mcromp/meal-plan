import { Dispatch } from "redux";
import { CalendarItem } from "../../types";
import { APIURL } from "../apiUrl";

export const CALENDAR_URL = APIURL + "calendar/";

export interface CalendarJSON {
 _id: string;
 foodItemId: string;
 dateAdded: string;
 quantity: number;
 userId: string;
 id?: string;
 __v: number;
}

export type CalendarGetAction =
 | CalendarGetRequest
 | CalendarGetSuccess
 | CalendarGetFailure;

export const CALENDAR_GET_REQUEST = "CALENDAR_GET_REQUEST";
export const CALENDAR_GET_SUCCESS = "CALENDAR_GET_SUCCESS";
export const CALENDAR_GET_FAILURE = "CALENDAR_GET_FAILURE";

export interface CalendarGetRequest {
 type: typeof CALENDAR_GET_REQUEST;
}
export interface CalendarGetSuccess {
 type: typeof CALENDAR_GET_SUCCESS;
 payload: CalendarItem[];
}
export interface CalendarGetFailure {
 type: typeof CALENDAR_GET_FAILURE;
 payload: string;
}

export interface CalendarState {
 loading: boolean;
 calendar: CalendarItem[];
 error: string;
}

const initalState: CalendarState = {
 loading: false,
 calendar: [],
 error: "",
};

export const calendarGet = () => {
 return (dispatch: Dispatch<CalendarGetAction>) => {
  dispatch({
   type: CALENDAR_GET_REQUEST,
  });
  fetch(CALENDAR_URL)
   .then((res) => res.json())
   .then((data: CalendarJSON[]) => {
    const calendar: CalendarItem[] = data.map((calendarItem) => {
     const {
      foodItemId: id,
      quantity,
      dateAdded: day,
      userId: user,
     } = calendarItem;
     return { id, quantity, day, user };
    });
    dispatch({
     type: CALENDAR_GET_SUCCESS,
     payload: calendar,
    });
   })
   .catch((err) => {
    console.error(err);
    dispatch({
     type: CALENDAR_GET_FAILURE,
     payload: err.message,
    });
   });
 };
};

export const calendarGetReducer = (
 state = initalState,
 action: CalendarGetAction
): CalendarState => {
 switch (action.type) {
  case CALENDAR_GET_REQUEST:
   return {
    ...state,
    loading: true,
   };
  case CALENDAR_GET_SUCCESS:
   return {
    loading: false,
    calendar: action.payload,
    error: "",
   };
  case CALENDAR_GET_FAILURE:
   return {
    loading: false,
    calendar: [],
    error: action.payload,
   };
  default:
   return state;
 }
};
