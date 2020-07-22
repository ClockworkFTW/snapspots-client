import { combineReducers } from "redux";

import userReducer from "./user";
import spotsReducer from "./spots";

const rootReducer = combineReducers({ user: userReducer, spots: spotsReducer });

export default rootReducer;
