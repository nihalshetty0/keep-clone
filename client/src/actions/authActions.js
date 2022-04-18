import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_NOTES,
  CLEAR_LABELS,
} from "./types";

import axios from "axios";
import setAuthToken from "../utils/setAuthTokens";

export const loadUser = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.post("/api/users", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });
    loadUser();
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.post("/api/auth", formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
    loadUser();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_NOTES,
  });
  dispatch({
    type: CLEAR_LABELS,
  });
};
export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
export const setLoading = () => (dispatch) => {
  console.log("loading");
  dispatch({
    type: SET_LOADING,
  });
};
