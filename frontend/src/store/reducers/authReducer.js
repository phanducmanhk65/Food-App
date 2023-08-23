import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../action/authAction";

const initialState = {
  username: null,
  errorMessage: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload,
        isAuthenticated: true,
        errorMessage: "",
      };
    case LOGIN_FAIL:
      return {
        ...state,
        username: null,
        isAuthenticated: false,
        errorMessage: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        errorMessage: null,
      };

    default:
      return state;
  }
};

export default authReducer;
