export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = "LOGOUT";

export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload : userData
  }
}

export const loginFail = (errorMessage) => {
  return {
    type: LOGIN_FAIL,
    payload : errorMessage,
  }
}
export const logout = () => ({
    type: LOGOUT,
  });