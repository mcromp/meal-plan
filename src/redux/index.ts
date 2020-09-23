import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import calendarReducer from "./calendar/calendar";
import favListReducer from "./favList";
import filterReducer from "./filterList";
import { menuReducer } from "./menuList";
import currentUserReducer from "./users/userCurrent";
import { userDeleteReducer } from "./users/userDelete";
import { userReducer } from "./users/users";
import { userSignupReducer } from "./users/userSignup";
// import logger from "redux-logger";

const rootReducer = combineReducers({
 calendar: calendarReducer,
 favList: favListReducer,
 filterList: filterReducer,
 menuList: menuReducer,
 usersState: userReducer,
 userDelete: userDeleteReducer,
 userSignup: userSignupReducer,
 currentUser: currentUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
