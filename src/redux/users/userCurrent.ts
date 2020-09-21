import { User } from "./users";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = (user: User) => ({
 type: SET_CURRENT_USER,
 payload: user,
});

export interface SetCurrentUser {
 type: typeof SET_CURRENT_USER;
 payload: User;
}

type currentUserActions = SetCurrentUser;

const currentUserReducer = (
 currentUser: User | {} = {},
 action: currentUserActions
) => {
 switch (action.type) {
  case SET_CURRENT_USER:
   return action.payload;
  default:
   return currentUser;
 }
};

export default currentUserReducer;
