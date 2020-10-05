import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { calendarReducer } from "./calendar/calendar";
import filterReducer from "./filterList/filterList";
import { alertMessageReducer } from "./alertMessage/alertMessage";
import { isLoadingReducer } from "./isLoading/isLoading";
import { menuReducer } from "./menuList/menuList";
import currentUserReducer from "./users/userCurrent";
import { userReducer } from "./users/users";
// import logger from "redux-logger";

const rootReducer = combineReducers({
 filterList: filterReducer,
 menuList: menuReducer,
 users: userReducer,
 currentUser: currentUserReducer,
 calendar: calendarReducer,
 isLoading: isLoadingReducer,
 alertMessage: alertMessageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
