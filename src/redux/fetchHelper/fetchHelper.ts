import { Dispatch } from "react";
import { setAlertMessage } from "../modules/alertMessage";
import { setCalendar } from "../modules/calendar";
import { setCurrentUser } from "../modules/currentUser";
import { isFailedToLoad } from "../modules/isFailedToLoad";
import { isLoading } from "../modules/isLoading";
import { addMenuList, setMenuList } from "../modules/menuList";
import { setUsersFromJSON, deleteOneUser, addUserFromJSON } from "../modules/users";
import { ReqType, ReqList, FetchHelperBodyType, FetchHelperDispatchTypes } from "./types";


export const fetchHelper  = (
 reqSelect: ReqType,
 body: FetchHelperBodyType = null,
 urlParam: string = ""
) => async (dispatch: Dispatch<FetchHelperDispatchTypes>) => {
 try {
  const fetchURL: string = ReqList[reqSelect].URL + urlParam;
  if (!fetchURL) throw Error("Error: invalid URL");
  dispatch(isLoading(true));

  const res = body
   ? await fetch(fetchURL, {
      method: ReqList[reqSelect].method,
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
  dispatch(isFailedToLoad(true));
  console.error(`Error with ${reqSelect} call`);
  console.error(error.message);
 }
};

const setReqData = (dispatch: any, response: any, reqSelect: ReqList) => {
 if (reqSelect === ReqType.reqGetMenu) dispatch(setMenuList(response));
 if (reqSelect === ReqType.reqAddMenu) dispatch(addMenuList(response));
 if (reqSelect === ReqType.reqGetUsers) dispatch(setUsersFromJSON(response));
 if (reqSelect === ReqType.reqGetUser) dispatch(setCurrentUser(response));
 if (reqSelect === ReqType.reqGetCalendar) dispatch(setCalendar(response));
 if (reqSelect === ReqType.reqAddFav) dispatch(setCurrentUser(response));
 if (reqSelect === ReqType.reqRemoveFav) dispatch(setCurrentUser(response));
 if (reqSelect === ReqType.reqDeleteUser) {
      dispatch(deleteOneUser(response._id));
      const deleteMessage: string = `User: ${response.username} deleted`;
      dispatch(setAlertMessage(deleteMessage));
 }
 if (reqSelect === ReqType.reqAddUser) {
      const userAddMessage: string = `User: ${response.username} added`;
      dispatch(addUserFromJSON(response));
      dispatch(setAlertMessage(userAddMessage)) 
 }
};