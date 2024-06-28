import { combineReducers } from "redux";
import UserDetails from "./userDetail";
import logInMessage from "./user";
import deliveryDetails from "./deliveryDetails";


const rootReducer = combineReducers({
    logInMessage,
    UserDetails,
    deliveryDetails
})
export default rootReducer;
