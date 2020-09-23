import { Dispatch } from "redux";
import { CalendarItem } from "../../types";
import { CALENDAR_URL } from "./calendarGet";

export const FETCH_CALENDAR_POST_REQUEST = "FETCH_CALENDAR_POST_REQUEST";
export const FETCH_CALENDAR_POST_SUCCESS = "FETCH_CALENDAR_POST_SUCCESS";
export const FETCH_CALENDAR_POST_FAILURE = "FETCH_CALENDAR_POST_FAILURE";

export interface FetchCalendarPostRequest {
 type: typeof FETCH_CALENDAR_POST_REQUEST;
}
export interface FetchCalendarPostSuccess {
 type: typeof FETCH_CALENDAR_POST_SUCCESS;
}
export interface FetchCalendarPostFailure {
 type: typeof FETCH_CALENDAR_POST_FAILURE;
 payload: string;
}

export type CalendarPostAction =
 | FetchCalendarPostRequest
 | FetchCalendarPostSuccess
 | FetchCalendarPostFailure;

export interface CalendarPostState {
 loading: boolean;
 error: string;
}

const initalState: CalendarPostState = {
 loading: false,
 error: "",
};

export const calendarPostFetch = (calendar: CalendarItem[]) => {
 return (dispatch: Dispatch<CalendarPostAction>) => {
  dispatch({
   type: FETCH_CALENDAR_POST_REQUEST,
  });
  fetch(CALENDAR_URL + "add", {
   method: "POST",
   body: JSON.stringify({ calendar }),
   headers: {
    "Content-Type": "application/json",
   },
  })
   .then((res) => res.json())
   .then(() => {
    dispatch({
     type: FETCH_CALENDAR_POST_SUCCESS,
    });
   })
   .catch((err) => {
    dispatch({
     type: FETCH_CALENDAR_POST_FAILURE,
     payload: err.message,
    });
   });
 };
};

export const calendarPostReducer = (
 state = initalState,
 action: CalendarPostAction
): CalendarPostState => {
 switch (action.type) {
  case FETCH_CALENDAR_POST_REQUEST:
   return {
    ...state,
    loading: true,
   };
  case FETCH_CALENDAR_POST_SUCCESS:
   return {
    ...state,
    loading: false,
   };
  case FETCH_CALENDAR_POST_FAILURE:
   return {
    loading: false,
    error: action.payload,
   };
  default:
   return state;
 }
};
