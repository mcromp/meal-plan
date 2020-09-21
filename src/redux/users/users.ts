import { Dispatch } from "redux";
import { APIURL } from "../apiUrl";

export const USERURL = APIURL + "users/";

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

export type UserGetAction =
 | FetchUsersRequest
 | FetchUsersSuccess
 | FetchUsersFailure;

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export interface FetchUsersRequest {
 type: typeof FETCH_USERS_REQUEST;
}
export interface FetchUsersSuccess {
 type: typeof FETCH_USERS_SUCCESS;
 payload: User[];
}
export interface FetchUsersFailure {
 type: typeof FETCH_USERS_FAILURE;
 payload: string;
}

export interface UsersState {
 loading: boolean;
 users: User[];
 error: string;
}

const initalState: UsersState = {
 loading: false,
 users: [],
 error: "",
};

export const usersGet = () => {
 return (dispatch: Dispatch<UserGetAction>) => {
  dispatch({
   type: FETCH_USERS_REQUEST,
  });
  fetch(USERURL)
   .then((res) => res.json())
   .then((data: UserJSON[]) => {
    const users: User[] = data.map((user) => {
     const id = user._id;
     return {
      id,
      favList: [...user.favList],
      username: user.username,
     };
    });
    dispatch({
     type: FETCH_USERS_SUCCESS,
     payload: users,
    });
   })
   .catch((err) => {
    console.error(err);
    dispatch({
     type: FETCH_USERS_FAILURE,
     payload: err.message,
    });
   });
 };
};

export const userReducer = (
 state = initalState,
 action: UserGetAction
): UsersState => {
 switch (action.type) {
  case FETCH_USERS_REQUEST:
   return {
    ...state,
    loading: true,
   };
  case FETCH_USERS_SUCCESS:
   return {
    loading: false,
    users: action.payload,
    error: "",
   };
  case FETCH_USERS_FAILURE:
   return {
    loading: false,
    users: [],
    error: action.payload,
   };
  default:
   return state;
 }
};
