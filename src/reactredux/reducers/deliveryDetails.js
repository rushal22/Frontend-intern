// src/reducers/deliveryDetailsReducer.js

 export const SET_DELIVERY_DETAILS = "SET_DELIVERY_DETAILS" 

const initialState = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  contact: "",
};

const deliveryDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_DELIVERY_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default deliveryDetails;
