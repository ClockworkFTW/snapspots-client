import { combineReducers } from "redux";

import userReducer from "./user";
import profileReducer from "./profile";
import searchReducer from "./search";
import spotReducer from "./spot";
import spotsReducer from "./spots";
import mapReducer from "./map";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  search: searchReducer,
  spot: spotReducer,
  spots: spotsReducer,
  map: mapReducer,
});

export default rootReducer;
