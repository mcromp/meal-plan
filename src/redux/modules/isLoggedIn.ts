const IS_LOGGED_IN = "food-app/isLoggedIn/IS_LOGGED_IN";

const reducer = (state: boolean = false, action: Is_Logged_In) => {
 switch (action.type) {
  case IS_LOGGED_IN:
   return action.isLoggedIn;
  default:
   return state;
 }
};

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
 type: IS_LOGGED_IN,
 isLoggedIn,
});

interface Is_Logged_In {
 type: typeof IS_LOGGED_IN;
 isLoggedIn: boolean;
}

export default reducer;
