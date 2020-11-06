import { User, UserJSON } from "../../shared/types";

export const SET_CURRENT_USER = "menu-plan/currentUser/SET_CURRENT_USER";
export const CLEAR_CURRENT_USER = "menu-plan/currentUser/CLEAR_CURRENT_USER";

const reducer = (
 currentUser: User | null = null,
 action: currentUserActions
) => {
 switch (action.type) {
  case SET_CURRENT_USER:
   const { _id, favList, username } = action.payload;
   const user = {
    id: _id,
    favList,
    username,
   };
   return user;
  case CLEAR_CURRENT_USER:
   return "";
  default:
   return currentUser;
 }
};

export const setCurrentUser = (user: UserJSON) => ({
 type: SET_CURRENT_USER,
 payload: user,
});
export const clearCurrentUser = () => ({
 type: CLEAR_CURRENT_USER,
});

interface SetCurrentUser {
 type: typeof SET_CURRENT_USER;
 payload: UserJSON;
}

interface ClearCurrentUser {
 type: typeof CLEAR_CURRENT_USER;
}

export type currentUserActions = SetCurrentUser | ClearCurrentUser;

export default reducer;
