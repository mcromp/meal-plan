export const IS_LOGGED_IN = "IS_LOGGED_IN";

export const isLoggedIn = (isLoggedIn: boolean) => ({
 type: IS_LOGGED_IN,
 isLoading: isLoggedIn,
});

export interface Is_Logged_In {
 type: typeof IS_LOGGED_IN;
 isLoading: boolean;
}

export const isLoggedInReducer = (
 state: boolean = false,
 action: Is_Logged_In
) => {
 switch (action.type) {
  case IS_LOGGED_IN:
   return action.isLoading;
  default:
   return state;
 }
};
