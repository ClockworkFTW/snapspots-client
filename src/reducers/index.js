import { combineReducers } from "redux";

import userReducer from "./user";
import spotReducer from "./spot";
import spotsReducer from "./spots";
import mapReducer from "./map";

const rootReducer = combineReducers({
  user: userReducer,
  spot: spotReducer,
  spots: spotsReducer,
  map: mapReducer,
});

export default rootReducer;
