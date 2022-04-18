import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import noteReducer from "./noteReducer";
import labelReducers from "./labelReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  notes: noteReducer,
  labels: labelReducers,
});
