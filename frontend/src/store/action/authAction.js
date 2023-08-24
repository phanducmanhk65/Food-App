import jwt_decode from "jwt-decode";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFail = (errorMessage) => {
  return {
    type: LOGIN_FAIL,
    payload: errorMessage,
  };
};

export const logout = () => (dispatch) => {
  // Xóa JWT khỏi lưu trữ
  localStorage.removeItem("token");

  // Xóa thông tin người dùng khỏi Local Storage
  localStorage.removeItem("userInfo");

  // Gửi hành động logout thông qua dispatch
  dispatch({ type: LOGOUT });
};
export const authenticateFromToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      const username = decodedToken.username; // Điều chỉnh phần này dựa trên dữ liệu từ token
      dispatch(loginSuccess(username));
    } catch (error) {
      dispatch(loginFail("Invalid token"));
    }
  }
};
