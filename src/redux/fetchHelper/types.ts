import { CalendarMenuItem, FilterId } from "../../shared/types";
import { AlertMessageActions } from "../modules/alertMessage";
import { SetCalendar } from "../modules/calendar";
import { IsFailedToLoadActions } from "../modules/isFailedToLoad";
import { IsLoadingActions } from "../modules/isLoading";
import { MenuListActions } from "../modules/menuList";
import { UsersActions } from "../modules/users";
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


export interface AddMenuBody {
  item: string,
  filter : FilterId | "",
}
export interface GetCalendarBody {
 dateList: string[];
}
export interface DeleteUserBody {
  id: string;
}
export interface AddUserBody {
username: string
}
export interface UpdateCalendarBody {
  userId: string;
  date: string;
  menuItems: CalendarMenuItem[];
}
export interface ToggleFavBody {
  userId: string;
  itemId: string;
}

export type FetchHelperBodyType = 
| AddMenuBody 
| GetCalendarBody 
| DeleteUserBody 
| AddUserBody
| UpdateCalendarBody 
| ToggleFavBody 
| null
| "";

export type FetchHelperDispatchTypes = 
 | UsersActions
 | SetCalendar
 | MenuListActions
 | AlertMessageActions
 | IsLoadingActions
 | IsFailedToLoadActions;

interface aa  { type: string, isLoading: boolean, }