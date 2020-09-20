import { Dispatch } from "redux";
import { URL } from "./users";

export const FETCH_USER_DELETE_REQUEST = "FETCH_USER_DELETE_REQUEST";
export const FETCH_USER_DELETE_SUCCESS = "FETCH_USER_DELETE_SUCCESS";
export const FETCH_USER_DELETE_FAILURE = "FETCH_USER_DELETE_FAILURE";

export interface FetchUserDeleteRequest {
 type: typeof FETCH_USER_DELETE_REQUEST;
}
export interface FetchUserDeleteSuccess {
 type: typeof FETCH_USER_DELETE_SUCCESS;
 payload: string;
}
export interface FetchUserDeleteFailure {
 type: typeof FETCH_USER_DELETE_FAILURE;
 payload: string;
}

export type UserDeleteAction =
 | FetchUserDeleteRequest
 | FetchUserDeleteSuccess
 | FetchUserDeleteFailure;

export interface UserDeleteState {
 loading: boolean;
 message: string;
 error: string;
}
const initalState: UserDeleteState = {
 loading: false,
 message: "",
 error: "",
};

export const deleteUser = (id: string) => {
 return (dispatch: Dispatch<UserDeleteAction>) => {
  dispatch({
   type: FETCH_USER_DELETE_REQUEST,
  });
  fetch(URL + id)
   .then((res) => res.json())
   .then((data: any) => {
    console.log(data);
    const resUsername = data.deletedUser.username;
    dispatch({
     type: FETCH_USER_DELETE_SUCCESS,
     payload: `${resUsername} deleted successfully`,
    });
   })
   .catch((err) => {
    console.error(err);
    dispatch({
     type: FETCH_USER_DELETE_FAILURE,
     payload: err.message,
    });
   });
 };
};

export const userDeleteReducer = (
 state = initalState,
 action: UserDeleteAction
): UserDeleteState => {
 switch (action.type) {
  case FETCH_USER_DELETE_REQUEST:
   return {
    ...state,
    loading: true,
   };
  case FETCH_USER_DELETE_SUCCESS:
   return {
    loading: false,
    message: action.payload,
    error: "",
   };
  case FETCH_USER_DELETE_FAILURE:
   return {
    loading: false,
    message: "Delete unsucessful",
    error: action.payload,
   };
  default:
   return state;
 }
};
