import { combineReducers } from "redux";

import userReducer from "./user";
import spotReducer from "./spot";
import spotsReducer from "./spots";

const rootReducer = combineReducers({
  user: userReducer,
  spot: spotReducer,
  spots: spotsReducer,
});

export default rootReducer;
