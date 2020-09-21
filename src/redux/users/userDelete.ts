import { Dispatch } from "redux";
import { User } from "./users";
import { APIURL } from "../apiUrl";

export const FETCH_USER_DELETE_REQUEST = "FETCH_USER_DELETE_REQUEST";
export const FETCH_USER_DELETE_SUCCESS = "FETCH_USER_DELETE_SUCCESS";
export const FETCH_USER_DELETE_FAILURE = "FETCH_USER_DELETE_FAILURE";
export const RESET_USER_DELETE_MESSAGE = "RESET_USER_DELETE_MESSAGE";

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
export interface ResetUserDeleteMessage {
 type: typeof RESET_USER_DELETE_MESSAGE;
 payload: string;
}

export type UserDeleteAction =
 | FetchUserDeleteRequest
 | FetchUserDeleteSuccess
 | FetchUserDeleteFailure
 | ResetUserDeleteMessage;

export interface UserDeleteState {
 loading: boolean;
 message: string | null;
 error: string;
}

interface DeleteRes {
 deletedUser: User;
}

const initalState: UserDeleteState = {
 loading: false,
 message: null,
 error: "",
};

export const resetDeleteMessage = () => ({
 type: RESET_USER_DELETE_MESSAGE,
});

export const deleteUserFetch = (id: string) => {
 return (dispatch: Dispatch<UserDeleteAction>) => {
  dispatch({
   type: FETCH_USER_DELETE_REQUEST,
  });
  fetch(APIURL + id, {
   method: "DELETE",
  })
   .then((res) => res.json())
   .then((data: DeleteRes) => {
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
  case RESET_USER_DELETE_MESSAGE:
   return {
    ...state,
    message: null,
   };
  default:
   return state;
 }
};
