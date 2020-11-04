import { MENU_URL, MENU_URL_ADD, USER_URL, CALENDAR_URL_GETMANY, USER_URL_SIGNUP, CALENDAR_URL_UPDATE, FAV_ADD, FAV_REMOVE, FAV_CLEAR } from "./apiURL";

export enum ReqType {
  reqGetMenu = "reqGetMenu",
  reqAddMenu = "reqAddMenu",
  reqGetUsers = "reqGetUsers",
  reqGetUser = "reqGetUser",
  reqGetCalendar = "reqGetCalendar",
  reqDeleteUser = "reqDeleteUser",
  reqAddUser = "reqAddUser",
  reqUpdateCalendar = "reqUpdateCalendar",
  reqAddFav = "reqAddFav",
  reqRemoveFav = "reqRemoveFav",
  reqClearFavList = "reqClearFavList",
}

export const ReqList = {
 reqGetMenu: { URL: MENU_URL, method: "GET" },
 reqAddMenu: { URL: MENU_URL_ADD, method: "POST"},
 reqGetUsers: { URL: USER_URL, method: "GET" },
 reqGetUser: { URL: USER_URL, method: "GET" },
 reqGetCalendar: { URL: CALENDAR_URL_GETMANY, method: "POST" },
 reqDeleteUser: { URL: USER_URL, method: "DELETE" },
 reqAddUser: { URL: USER_URL_SIGNUP, method: "POST" },
 reqUpdateCalendar: { URL: CALENDAR_URL_UPDATE, method: "POST" },
 reqAddFav: { URL: FAV_ADD, method: "POST" },
 reqRemoveFav: { URL: FAV_REMOVE, method: "POST" },
 reqClearFavList: { URL: FAV_CLEAR, method: "POST" },
} as const

export type ReqList = keyof typeof ReqType