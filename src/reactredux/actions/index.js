import baseApi from "../../apibase-endpoint/apiBase";
import { userEnd } from "../../apibase-endpoint/apiEndpoint";

import logInMessage, { LOGIN_PENDING , LOGIN_ERROR , LOGIN_SUCCESS } from "../reducers/user";
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
export const loginUser = (data) => {
  
  return async(dispatch) => {
    try {
      const res = await baseApi({apiDetails:userEnd.login, body:data});
      const resData = res;
      console.log(resData.data.user);
      if(res.status === 200){
        dispatch(logInPending());
        dispatch(logIn(resData.data.user));
        dispatch(logInSuccess(resData.data.message))
      }
    } catch (error) { 
      dispatch(logInError(error));
    }
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    try{
      dispatch(logOut())
    }catch(err){
      dispatch(logInError(err));
    }
  }
}
