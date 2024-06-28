export const ADD_TO_CART = "ADD_TO_CART"


const initialState = {
  notificationCount: 0,
  notifications: []
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        notificationCount: state.notificationCount + 1,
        notifications: [...state.notifications, action.payload] // This line is causing the error
      };
    default:
      return state;
  }
};

export default CartReducer;
