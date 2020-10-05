import { setCalendar } from "../calendar/calendar";
import { setAlertMessage } from "../alertMessage/alertMessage";
import { isLoading } from "../isLoading/isLoading";
import { setMenuList } from "../menuList/menuList";
import * as url from "../urls/apiUrl";
import { setUsers } from "../users/users";

export const reqGetMenu = "reqGetMenu";
export const reqGetUsers = "reqGetUsers";
export const reqGetCalendar = "reqGetCalendar";
export const reqDeleteUser = "reqDeleteUser";
export const reqAddUser = "reqAddUser";
export const reqUpdateCalendar = "reqUpdateCalendar";
export const reqAddFav = "reqAddFav";
export const reqRemoveFav = "reqRemoveFav";
export const reqClearFavList = "reqClearFavList";

export const reqList: any = {
 reqGetMenu: { URL: url.MENU_URL, method: "" },
 reqGetUsers: { URL: url.USER_URL, method: "" },
 reqGetCalendar: { URL: url.CALENDAR_URL_GETMANY, method: "POST" },
 reqDeleteUser: { URL: url.USER_URL, method: "DELETE" },
 reqAddUser: { URL: url.USER_URL_SIGNUP, method: "POST" },
 reqUpdateCalendar: { URL: url.CALENDAR_URL_UPDATE, method: "POST" },
 reqAddFav: { URL: url.FAV_ADD, method: "POST" },
 reqRemoveFav: { URL: url.FAV_REMOVE, method: "POST" },
 reqClearFavList: { URL: url.FAV_CLEAR, method: "POST" },
};

export const fetchDispatch = (
 reqSelect: string,
 body: any = null,
 urlParam: string = ""
) => async (dispatch: any) => {
 try {
  const fetchURL: string = reqList[reqSelect].URL + urlParam;
  if (!fetchURL) throw Error("Error: invalid URL");
  dispatch(isLoading(true));

  const res = body
   ? await fetch(fetchURL, {
      method: reqList[reqSelect].method,
      body: JSON.stringify(body),
      headers: {
       "Content-Type": "application/json",
      },
     })
   : await fetch(fetchURL + urlParam);

  if (!res.ok) throw Error(await res.json());
  const data = await res.json();
  setReqData(dispatch, data, reqSelect);
  dispatch(isLoading(false));
 } catch (error) {
  dispatch(isLoading(false));
  dispatch(setAlertMessage(error.message));
 }
};

const setReqData = (dispatch: any, data: any, reqSelect: string) => {
 if (reqSelect === reqGetMenu) dispatch(setMenuList(data));
 if (reqSelect === reqGetUsers) dispatch(setUsers(data));

 if (reqSelect === reqGetCalendar) dispatch(setCalendar(data));
 if (reqSelect === reqDeleteUser) {
  const deleteMessage: string = `User: ${data.username} deleted`;
  dispatch(setAlertMessage(deleteMessage));
 }
 if (reqSelect === reqAddUser) {
  const userAddMessage: string = `${data.username} added`;
  dispatch(setAlertMessage(userAddMessage));
 }
 //remove this line after dev
 if (reqSelect === reqUpdateCalendar) {
  console.log("Update worked " + reqSelect);
 }
};
