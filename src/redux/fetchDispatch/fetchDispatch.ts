import { setCalendar } from "../calendar/calendar";
import { setAlertMessage } from "../alertMessage/alertMessage";
import { isLoading } from "../isLoading/isLoading";
import { setMenuList } from "../menuList/menuList";
import * as url from "../urls/apiUrl";
import { deleteOneUser, setUsersFromJSON } from "../users/users";
import { setCurrentUser } from "../users/currentUser";

export const reqGetMenu = "reqGetMenu";
export const reqGetUsers = "reqGetUsers";
export const reqGetUser = "reqGetUser";
export const reqGetCalendar = "reqGetCalendar";
export const reqDeleteUser = "reqDeleteUser";
export const reqAddUser = "reqAddUser";
export const reqUpdateCalendar = "reqUpdateCalendar";
export const reqAddFav = "reqAddFav";
export const reqRemoveFav = "reqRemoveFav";
export const reqClearFavList = "reqClearFavList";

export const reqList: any = {
 reqGetMenu: { URL: url.MENU_URL, method: "GET" },
 reqGetUsers: { URL: url.USER_URL, method: "GET" },
 reqGetUser: { URL: url.USER_URL, method: "GET" },
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
   : await fetch(fetchURL);

  if (!res.ok) throw Error(await res.json());
  const response = await res.json();
  setReqData(dispatch, response, reqSelect);
  dispatch(isLoading(false));
 } catch (error) {
  dispatch(isLoading(false));
  console.error(`Error with ${reqSelect} call`);
  console.error(error.message);
 }
};

const setReqData = (dispatch: any, response: any, reqSelect: string) => {
 if (reqSelect === reqGetMenu) dispatch(setMenuList(response));
 if (reqSelect === reqGetUsers) dispatch(setUsersFromJSON(response));
 if (reqSelect === reqGetUser) dispatch(setCurrentUser(response));
 if (reqSelect === reqGetCalendar) dispatch(setCalendar(response));
 if (reqSelect === reqDeleteUser) {
  dispatch(deleteOneUser(response._id));
  const deleteMessage: string = `User: ${response.username} deleted`;
  dispatch(setAlertMessage(deleteMessage));
 }
 if (reqSelect === reqAddUser) {
  const userAddMessage: string = `${response.username} added`;
  dispatch(setAlertMessage(userAddMessage));
 }
};
