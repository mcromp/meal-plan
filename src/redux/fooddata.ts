const dummyURL: string = "https://jsonplaceholder.typicode.com/users";

//ACTION TYPES
export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
//ACTION CREATOR
const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

const fetchDataSuccess = (data: any) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};
const fetchDataFailure = (error: any) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};

//ASYNC ACTION CREATOR
export const fetchData = () => {
  return (dispatch: any) => {
    dispatch(fetchDataRequest);
    fetch(dummyURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(fetchDataSuccess(data));
      })
      .catch((err) => {
        console.error(err);
        dispatch(fetchDataFailure(err.message));
      });
  };
};

// REDUCER
const initalState = {
  loading: false,
  data: [],
  error: "",
};

export const dataReducer = (state = initalState, action: any) => {
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
