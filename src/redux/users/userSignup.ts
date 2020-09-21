import { Dispatch } from "redux";
import { USERURL } from "./users";

export const FETCH_USER_SIGNUP_REQUEST = "FETCH_USER_SIGNUP_REQUEST";
export const FETCH_USER_SIGNUP_SUCCESS = "FETCH_USER_SIGNUP_SUCCESS";
export const FETCH_USER_SIGNUP_FAILURE = "FETCH_USER_SIGNUP_FAILURE";
export const RESET_USER_SIGNUP_MESSAGE = "RESET_USER_SIGNUP_MESSAGE";

export interface FetchUserSignupRequest {
 type: typeof FETCH_USER_SIGNUP_REQUEST;
}
export interface FetchUserSignupSuccess {
 type: typeof FETCH_USER_SIGNUP_SUCCESS;
 payload: string;
}
export interface FetchUserSignupFailure {
 type: typeof FETCH_USER_SIGNUP_FAILURE;
 payload: string;
}
export interface ResetUserSignupMessage {
 type: typeof RESET_USER_SIGNUP_MESSAGE;
 payload: string;
}

export type UserDeleteAction =
 | FetchUserSignupRequest
 | FetchUserSignupSuccess
 | FetchUserSignupFailure
 | ResetUserSignupMessage;

export interface UserDeleteState {
 loading: boolean;
 message: string | null;
 error: string;
}

const initalState: UserDeleteState = {
 loading: false,
 message: null,
 error: "",
};

export const resetSignupMessage = () => ({
 type: RESET_USER_SIGNUP_MESSAGE,
});

export const signupUserFetch = (username: string) => {
 return (dispatch: Dispatch<UserDeleteAction>) => {
  dispatch({
   type: FETCH_USER_SIGNUP_REQUEST,
  });
  fetch(USERURL + "signup", {
   method: "POST",
   body: JSON.stringify({ username }),
   headers: {
    "Content-Type": "application/json",
   },
  })
   .then((res) => res.json())
   .then((res) => {
    const newUser = res.newUser.username;
    dispatch({
     type: FETCH_USER_SIGNUP_SUCCESS,
     payload: `${newUser} added successfully`,
    });
   })
   .catch((err) => {
    dispatch({
     type: FETCH_USER_SIGNUP_FAILURE,
     payload: err.message,
    });
   });
 };
};

export const userSignupReducer = (
 state = initalState,
 action: UserDeleteAction
): UserDeleteState => {
 switch (action.type) {
  case FETCH_USER_SIGNUP_REQUEST:
   return {
    ...state,
    loading: true,
   };
  case FETCH_USER_SIGNUP_SUCCESS:
   return {
    loading: false,
    message: action.payload,
    error: "",
   };
  case FETCH_USER_SIGNUP_FAILURE:
   return {
    loading: false,
    message: "Signup unsucessful: " + action.payload,
    error: action.payload,
   };
  case RESET_USER_SIGNUP_MESSAGE:
   return {
    ...state,
    message: null,
   };
  default:
   return state;
 }
};
