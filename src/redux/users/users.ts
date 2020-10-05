export interface UserJSON {
 _id: string;
 favList: string[];
 username: string;
 createdAt: string;
 updatedAt: string;
 __v: number;
}
export interface User {
 id: string;
 favList: string[];
 username: string;
}

export const SET_USERS = "SET_USERS";

export interface SetUsers {
 type: typeof SET_USERS;
 users: User[];
}

export const setUsers = (userJSON: UserJSON[]) => {
 let users: User[] = userJSON.map((user) => {
  const id = user._id;
  return {
   id,
   favList: [...user.favList],
   username: user.username,
  };
 });
 return {
  type: SET_USERS,
  users,
 };
};

export const userReducer = (state = [], action: SetUsers) => {
 switch (action.type) {
  case SET_USERS:
   return action.users;
  default:
   return state;
 }
};
