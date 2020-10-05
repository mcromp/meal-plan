export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";

export const setAlertMessage = (message: string) => ({
 type: SET_ALERT_MESSAGE,
 message,
});

export interface AlertMessage {
 type: typeof SET_ALERT_MESSAGE;
 message: string;
}

export const alertMessageReducer = (
 state: string = "",
 action: AlertMessage
) => {
 switch (action.type) {
  case SET_ALERT_MESSAGE:
   return action.message;
  default:
   return state;
 }
};
