import { LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT } from "../action/authAction";

const initialState= {
    username: null,
    errorMessage: null,
}

export const authReducer = (state = initialState, action) => {
switch(action.type){
    case LOGIN_SUCCESS:
        return{
            ...state,
            username: action.payload,
            errorMessage: "",
        }
        case LOGIN_FAIL:
      return {
        ...state,
        username: null,
        errorMessage: action.payload,
      };
      case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
}

 }
 export default authReducer;