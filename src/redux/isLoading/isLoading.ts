export const IS_LOADING = "IS_LOADING";

export const isLoading = (isLoading: boolean) => ({
 type: IS_LOADING,
 isLoading,
});

export interface Is_Loading {
 type: typeof IS_LOADING;
 isLoading: boolean;
}

export const isLoadingReducer = (
 state: boolean = false,
 action: Is_Loading
) => {
 switch (action.type) {
  case IS_LOADING:
   return action.isLoading;
  default:
   return state;
 }
};
