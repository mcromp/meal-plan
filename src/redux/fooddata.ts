import { Dispatch } from "redux";

export interface FoodItem {
 ITEM: string;
 CAL: string;
 PRICE: string;
 CATEGORY: string;
 ID: string;
}

const dummyURL: string = "https://jsonplaceholder.typicode.com/users";

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

export const fetchDataSuccess = (data: FoodItem[]) => {
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
export const fetchData = () => {
 return (dispatch: Dispatch<DataAction>) => {
  dispatch({
   type: FETCH_DATA_REQUEST,
  });
  fetch(dummyURL)
   .then((res) => res.json())
   .then((data: FoodItem[]) => {
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
 payload: FoodItem[];
}

export interface FetchDataFailure {
 type: typeof FETCH_DATA_FAILURE;
 payload: string;
}

export type DataAction = FetchDataRequest | FetchDataSuccess | FetchDataFailure;

export interface DataState {
 loading: boolean;
 data: FoodItem[];
 error: string;
}

// REDUCER
const initalState: DataState = {
 loading: false,
 data: [],
 error: "",
};

export const dataReducer = (
 state = initalState,
 action: DataAction
): DataState => {
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
