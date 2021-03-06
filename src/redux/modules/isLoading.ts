const IS_LOADING: string = "menu-plan/isLoading/IS_LOADING";

const reducer = (state: boolean = false, action: Is_Loading) => {
 switch (action.type) {
  case IS_LOADING:
   return action.isLoading;
  default:
   return state;
 }
};

export const isLoading = (isLoading: boolean) => ({
 type: IS_LOADING,
 isLoading,
});

interface Is_Loading {
 type: typeof IS_LOADING;
 isLoading: boolean;
};

export type IsLoadingActions = Is_Loading;

export default reducer;
