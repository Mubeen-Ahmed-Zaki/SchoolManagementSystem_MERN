// authReducer.js
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../Actions/authAction";

const initialState = {
  loading: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };

    case SIGNUP_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, error: null, };

    case SIGNUP_FAIL:
      return { ...state, loading: false, error: action.payload };

    // LOGIN
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };

    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    // LOGOUT
    case LOGOUT:
      return { loading: false, userInfo: null, error: null };

    default:
      return state;
  }
};
