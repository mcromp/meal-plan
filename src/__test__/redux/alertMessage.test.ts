import {
 setAlertMessage,
 SET_ALERT_MESSAGE,
} from "../../redux/modules/alertMessage";

describe("alertMessage action", () => {
 test("sets a string to be the message", () => {
  const testString = "test string";
  const expectedAction = {
   type: SET_ALERT_MESSAGE,
   message: testString,
  };
  expect(setAlertMessage(testString)).toEqual(expectedAction);
 });
});
