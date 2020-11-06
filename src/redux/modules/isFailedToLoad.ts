const IS_FAILED_TO_LOAD: string = "menu-plan/isFailedToLoad/IS_FAILED_TO_LOAD";

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

export type IsFailedToLoadActions = Is_Failed_To_Load;

export default reducer;
