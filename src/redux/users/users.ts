export type UserJSON = {
 _id: string;
 favList: string[];
 username: string;
 createdAt: string;
 updatedAt: string;
 __v: number;
};
export type User = {
 id: string;
 favList: string[];
 username: string;
};

export const SET_USERS_FROM_JSON = "SET_USERS_FROM_JSON";
export const ADD_USER_JSON = "ADD_USER_JSON";
export const DELETE_ONE_USER = "DELETE_ONE_USER";

export interface SetUsersFromJSON {
 type: typeof SET_USERS_FROM_JSON;
 users: User[];
}

export interface AddUserJSON {
 type: typeof ADD_USER_JSON;
 user: User;
}
export interface DeleteOneUser {
 type: typeof DELETE_ONE_USER;
 id: string;
}

export const setUsersFromJSON = (userJSON: UserJSON[]) => {
 let users: User[] = userJSON.map((user) => {
  const id = user._id;
  return {
   id,
   favList: [...user.favList],
   username: user.username,
  };
 });
 return {
  type: SET_USERS_FROM_JSON,
  users,
 };
};

export const addUserFromJSON = (userJSON: UserJSON) => {
 const { favList, username, _id: id } = userJSON;
 const user = {
  id,
  favList,
  username,
 };
 return {
  type: ADD_USER_JSON,
  user,
 };
};

export const deleteOneUser = (id: string) => {
 return {
  type: DELETE_ONE_USER,
  id,
 };
};

export type UsersActions = SetUsersFromJSON | DeleteOneUser | AddUserJSON;

export const userReducer = (state: User[] = [], action: UsersActions) => {
 switch (action.type) {
  case SET_USERS_FROM_JSON:
   return action.users;
  case ADD_USER_JSON:
   return [...state, action.user];
  case DELETE_ONE_USER:
   return state.filter((u) => !(u.id === action.id));
  default:
   return state;
 }
};
