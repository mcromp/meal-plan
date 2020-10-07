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
export const DELETE_ONE_USER = "DELETE_ONE_USER";

export interface SetUsersFromJSON {
 type: typeof SET_USERS_FROM_JSON;
 users: User[];
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

export const deleteOneUser = (id: string) => {
 return {
  type: DELETE_ONE_USER,
  id,
 };
};

export type UsersActions = SetUsersFromJSON | DeleteOneUser;

export const userReducer = (state: User[] = [], action: UsersActions) => {
 switch (action.type) {
  case SET_USERS_FROM_JSON:
   return action.users;
  case DELETE_ONE_USER:
   return state.filter((u) => !(u.id === action.id));
  default:
   return state;
 }
};
