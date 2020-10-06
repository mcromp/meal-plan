export const IS_LOGGED_IN = "IS_LOGGED_IN";

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
 type: IS_LOGGED_IN,
 isLoggedIn,
});

export interface Is_Logged_In {
 type: typeof IS_LOGGED_IN;
 isLoggedIn: boolean;
}

export const isLoggedInReducer = (
 state: boolean = false,
 action: Is_Logged_In
) => {
 switch (action.type) {
  case IS_LOGGED_IN:
   console.log(action);
   return action.isLoggedIn;
  default:
   return state;
 }
};
