import { hasErrored } from "../hasErrored/hasErrored";
import { isLoading } from "../isLoading/isLoading";
import { setMenuList } from "../menuList/menuList";
import { MENU_URL, USER_URL } from "../urls/apiUrl";
import { setUsers } from "../users/users";

export const fetchingData: any = {
 req_getMenu: { URL: MENU_URL, method: {} },
 req_getUsers: { URL: USER_URL, method: {} },
};

export const fetchDispatch = (reqSelect: string) => async (dispatch: any) => {
 try {
  const fetchURL: string = fetchingData[reqSelect].URL;
  if (!fetchURL) throw Error("Error: Fetch Request not found");
  dispatch(isLoading(true));
  const res = await fetch(fetchURL);
  if (!res.ok) throw Error(res.statusText);
  const data = await res.json();
  setData(dispatch, data, reqSelect);
  dispatch(isLoading(false));
 } catch (error) {
  dispatch(hasErrored(error.message));
 }
};

const setData = (dispatch: any, data: any, reqSelect: string) => {
 if (reqSelect === "req_getMenu") dispatch(setMenuList(data));
 if (reqSelect === "req_getUsers") dispatch(setUsers(data));

 //  if (reqSelect === "2") dispatch(setBnfo(data));
};
