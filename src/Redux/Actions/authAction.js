// authActions.js
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

const host = "http://localhost:7000"
export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });

    const res = await fetch(`${host}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (res.ok) {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: SIGNUP_FAIL,
        payload: data.msg || "Signup failed",
      });
    }
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.message,
    });
  }
};


// -------------------------------------------------------------------//

//  Login
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const res = await fetch(`${host}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Login failed");
    }

    // token & user info save localStorage me
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};


// Logout
export const LOGOUT = "LOGOUT";
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: LOGOUT });
};
