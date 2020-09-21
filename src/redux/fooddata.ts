import { Dispatch } from "redux";
import { APIURL } from "./apiUrl";

export interface MenuItem {
 ITEM: string;
 CAL: string;
 PRICE: string;
 CATEGORY: string;
 ID: string;
}

//ACTION TYPES
export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// ACTION CREATOR
export const fetchDataRequest = () => {
 return {
  type: FETCH_DATA_REQUEST,
 };
};

export const fetchDataSuccess = (data: MenuItem[]) => {
 return {
  type: FETCH_DATA_SUCCESS,
  payload: data,
 };
};
export const fetchDataFailure = (error: string) => {
 return {
  type: FETCH_DATA_FAILURE,
  payload: error,
 };
};

//ASYNC ACTION CREATOR
export const fetchMenuList = () => {
 return (dispatch: Dispatch<DataAction>) => {
  dispatch({
   type: FETCH_DATA_REQUEST,
  });
  fetch(APIURL + "menu")
   .then((res) => res.json())
   .then((data: MenuItem[]) => {
    dispatch({
     type: FETCH_DATA_SUCCESS,
     payload: data,
    });
   })
   .catch((err) => {
    console.error(err);
    dispatch({
     type: FETCH_DATA_FAILURE,
     payload: err.message,
    });
   });
 };
};

//TYPES

export interface FetchDataRequest {
 type: typeof FETCH_DATA_REQUEST;
}

export interface FetchDataSuccess {
 type: typeof FETCH_DATA_SUCCESS;
 payload: MenuItem[];
}

export interface FetchDataFailure {
 type: typeof FETCH_DATA_FAILURE;
 payload: string;
}

export type DataAction = FetchDataRequest | FetchDataSuccess | FetchDataFailure;

export interface MenuState {
 loading: boolean;
 data: MenuItem[];
 error: string;
}

// REDUCER
const initalState: MenuState = {
 loading: false,
 data: [],
 error: "",
};

export const menuReducer = (
 state = initalState,
 action: DataAction
): MenuState => {
 switch (action.type) {
  case FETCH_DATA_REQUEST:
   return {
    ...state,
    loading: true,
   };
  case FETCH_DATA_SUCCESS:
   return {
    loading: false,
    data: action.payload,
    error: "",
   };
  case FETCH_DATA_FAILURE:
   return {
    loading: false,
    data: [],
    error: action.payload,
   };
  default:
   return state;
 }
};
