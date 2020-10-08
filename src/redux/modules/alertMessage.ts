const SET_ALERT_MESSAGE = "food-app/SET_ALERT_MESSAGE";

const reducer = (state: string = "", action: AlertMessage) => {
 switch (action.type) {
  case SET_ALERT_MESSAGE:
   return action.message;
  default:
   return state;
 }
};
export const setAlertMessage = (message: string) => ({
 type: SET_ALERT_MESSAGE,
 message,
});

interface AlertMessage {
 type: typeof SET_ALERT_MESSAGE;
 message: string;
}

export default reducer;
