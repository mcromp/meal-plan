import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { calendarReducer } from "./calendar/calendar";
import { calendarPostReducer } from "./calendar/calendarUpdate";

import filterReducer from "./filterList/filterList";
import { hasErroredReducer } from "./hasErrored/hasErrored";
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
 calendarPost: calendarPostReducer,
 calendar: calendarReducer,
 isLoading: isLoadingReducer,
 hasErrored: hasErroredReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
