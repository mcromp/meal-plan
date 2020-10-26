const IS_FAILED_TO_LOAD = "food-app/isFailedToLoad/IS_FAILED_TO_LOAD";

const reducer = (state: boolean = false, action: Is_Failed_To_Load) => {
 switch (action.type) {
  case IS_FAILED_TO_LOAD:
   return action.isFailedToLoad;
  default:
   return state;
 }
};

export const isFailedToLoad = (isFailedToLoad: boolean) => ({
 type: IS_FAILED_TO_LOAD,
 isFailedToLoad,
});

interface Is_Failed_To_Load {
 type: typeof IS_FAILED_TO_LOAD;
 isFailedToLoad: boolean;
};

export default reducer;
