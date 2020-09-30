import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { calendarGetReducer } from "./calendar/calendarGet";
import { calendarPostReducer } from "./calendar/calendarUpdate";
import filterReducer from "./filterList";
import { menuReducer } from "./menuList/menuList";
import currentUserReducer from "./users/userCurrent";
import { userDeleteReducer } from "./users/userDelete";
import { userReducer } from "./users/users";
import { userSignupReducer } from "./users/userSignup";
// import logger from "redux-logger";

const rootReducer = combineReducers({
 filterList: filterReducer,
 menuList: menuReducer,
 usersState: userReducer,
 userDelete: userDeleteReducer,
 userSignup: userSignupReducer,
 currentUser: currentUserReducer,
 calendarPost: calendarPostReducer,
 calendarGet: calendarGetReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
