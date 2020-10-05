import { setCalendar } from "../calendar/calendar";
import { setAlertMessage } from "../alertMessage/alertMessage";
import { isLoading } from "../isLoading/isLoading";
import { setMenuList } from "../menuList/menuList";
import * as url from "../urls/apiUrl";
import { setUsers } from "../users/users";

export const fetchingData: any = {
 reqGetMenu: { URL: url.MENU_URL, method: "" },
 reqGetUsers: { URL: url.USER_URL, method: "" },
 reqGetCalendar: { URL: url.CALENDAR_URL_GETMANY, method: "POST" },
 reqDeleteUser: { URL: url.USER_URL, method: "DELETE" },
 reqAddUser: { URL: url.USER_URL_SIGNUP, method: "POST" },
 reqUpdateCalendar: { URL: url.CALENDAR_URL_UPDATE, method: "POST" },
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
  dispatch(setAlertMessage(error.message));
 }
};

const setData = (dispatch: any, data: any, reqSelect: string) => {
 if (reqSelect === "req_getMenu") dispatch(setMenuList(data));
 if (reqSelect === "req_getUsers") dispatch(setUsers(data));
 if (reqSelect === "req_getCalendar") dispatch(setCalendar(data));
 if (reqSelect === "req_deleteUser")
  dispatch(setAlertMessage(`User: ${data.username} deleted`));
 if (reqSelect === "req_addUser")
  dispatch(setAlertMessage(`${data.username} added`));
};
