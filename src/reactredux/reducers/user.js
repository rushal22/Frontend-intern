export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

const initialState = {
  processing: false,
  error: {},
  successMessage: null,
};

const logInMessage = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return { ...state, processing: false, error: action.payload };
    case LOGIN_PENDING:
      return { ...state, processing: true, error: {}, successMessage: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        processing: false,
        error: {},
        successMessage: action.payload,
      };
    default:
      return initialState;
  }
};

export default logInMessage;
