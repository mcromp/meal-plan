import { setCalendar } from "../calendar/calendar";
import { hasErrored } from "../hasErrored/hasErrored";
import { isLoading } from "../isLoading/isLoading";
import { setMenuList } from "../menuList/menuList";
import {
 CALENDAR_URL_GETMANY,
 MENU_URL,
 USER_URL,
 USER_URL_SIGNUP,
} from "../urls/apiUrl";
import { setUsers } from "../users/users";

export const fetchingData: any = {
 req_getMenu: { URL: MENU_URL, method: "" },
 req_getUsers: { URL: USER_URL, method: "" },
 req_getCalendar: { URL: CALENDAR_URL_GETMANY, method: "POST" },
 req_deleteUser: { URL: USER_URL, method: "DELETE" },
 req_addUser: { URL: USER_URL_SIGNUP, method: "POST" },
};

export const fetchDispatch = (
 reqSelect: string,
 urlParam: string = "",
 body: any = null
) => async (dispatch: any) => {
 try {
  const fetchURL: string = fetchingData[reqSelect].URL + urlParam;
  if (!fetchURL) throw Error("Error: invalid URL");
  dispatch(isLoading(true));
  const res = body
   ? await fetch(fetchURL, {
      method: fetchingData[reqSelect].method,
      body: JSON.stringify(body),
      headers: {
       "Content-Type": "application/json",
      },
     })
   : await fetch(fetchURL + urlParam);

  if (!res.ok) throw Error(await res.json());
  const data = await res.json();
  setData(dispatch, data, reqSelect);
  dispatch(isLoading(false));
 } catch (error) {
  dispatch(isLoading(false));
  dispatch(hasErrored(error.message));
 }
};

const setData = (dispatch: any, data: any, reqSelect: string) => {
 if (reqSelect === "req_getMenu") dispatch(setMenuList(data));
 if (reqSelect === "req_getUsers") dispatch(setUsers(data));
 if (reqSelect === "req_getCalendar") dispatch(setCalendar(data));
 if (reqSelect === "req_deleteUser")
  dispatch(hasErrored(`User: ${data.username} deleted`));
 if (reqSelect === "req_addUser")
  dispatch(hasErrored(`${data.username} added`));
};
