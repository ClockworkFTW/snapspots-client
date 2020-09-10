import { combineReducers } from "redux";

import userReducer from "./user";
import spotReducer from "./spot";
import spotsReducer from "./spots";
import mapReducer from "./map";
import photoReducer from "./photo";

const rootReducer = combineReducers({
  user: userReducer,
  spot: spotReducer,
  spots: spotsReducer,
  map: mapReducer,
  photo: photoReducer,
});

export default rootReducer;
