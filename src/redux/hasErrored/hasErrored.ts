export const HAS_ERRORED = "HAS_ERRORED";

export const hasErrored = (message: string) => ({
 type: HAS_ERRORED,
 message,
});

export interface HasErrored {
 type: typeof HAS_ERRORED;
 message: string;
}

export const hasErroredReducer = (state: string = "", action: HasErrored) => {
 switch (action.type) {
  case HAS_ERRORED:
   console.error(action.message);
   return action.message;
  default:
   return state;
 }
};
