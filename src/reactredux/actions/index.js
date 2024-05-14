import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";

import { LOGIN_PENDING , LOGIN_ERROR , LOGIN_SUCCESS } from "../reducers/user";
import { LOGIN , LOGOUT } from "../reducers/userDetail";

export const logIn = (data) => {
  return {
    type: LOGIN,
    payload: data
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
    payload: {}
  };
};

export const logInError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};
export const logInPending = () => {
  return {
    type: LOGIN_PENDING,
  };
};
export const logInSuccess = (message) => {
  return {
    type: LOGIN_SUCCESS,
    payload: message
  }
}

export const logOutUser = () => {
  return (dispatch) => {
    try{
      localStorage.clear()
      dispatch(logOut())
    }catch(err){
      dispatch(logInError(err));
    }
  }
}
