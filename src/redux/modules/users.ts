import { User, UserJSON } from "../../shared/types";

const SET_USERS_FROM_JSON = "menu-plan/users/SET_USERS_FROM_JSON";
const ADD_USER_JSON = "menu-plan/users/ADD_USER_JSON";
const DELETE_ONE_USER = "menu-plan/users/DELETE_ONE_USER";

const reducer = (state: User[] = [], action: UsersActions) => {
 switch (action.type) {
  case SET_USERS_FROM_JSON:
   const users: User[] = action.userJSONs.map((user) => {
    const id = user._id;
    return { id, favList: [...user.favList], username: user.username };
   });
   return users;
  case ADD_USER_JSON:
   const { favList, username, _id: id } = action.userJSON;
   const user = { id, favList, username };
   return [...state, user];
  case DELETE_ONE_USER:
   return state.filter((u) => !(u.id === action.id));
  default:
   return state;
 }
};

export const setUsersFromJSON = (userJSONs: UserJSON[]) => {
 return {
  type: SET_USERS_FROM_JSON,
  userJSONs,
 };
};

export const addUserFromJSON = (userJSON: UserJSON) => {
 return {
  type: ADD_USER_JSON,
  userJSON,
 };
};

export const deleteOneUser = (id: string) => {
 return {
  type: DELETE_ONE_USER,
  id,
 };
};

interface SetUsersFromJSON {
 type: typeof SET_USERS_FROM_JSON;
 userJSONs: UserJSON[];
}

interface AddUserJSON {
 type: typeof ADD_USER_JSON;
 userJSON: UserJSON;
}
interface DeleteOneUser {
 type: typeof DELETE_ONE_USER;
 id: string;
}

export type UsersActions = SetUsersFromJSON | DeleteOneUser | AddUserJSON;

export default reducer;
