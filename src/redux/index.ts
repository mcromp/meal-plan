import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import calendar from "./modules/calendar";
import filterList from "./modules/filterList";
import alertMessage from "./modules/alertMessage";
import isLoading from "./modules/isLoading";
import menuList from "./modules/menuList";
import currentUser from "./modules/currentUser";
import users from "./modules/users";
import isLoggedIn from "./modules/isLoggedIn";

const rootReducer = combineReducers({
 filterList,
 menuList,
 users,
 currentUser,
 calendar,
 isLoading,
 isLoggedIn,
 alertMessage,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
