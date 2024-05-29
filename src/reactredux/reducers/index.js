import UserDetails from "./userDetail";
import logInMessage from "./user";
import searchReducer from "./search";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    logInMessage,
    UserDetails,
})
export default rootReducer;
