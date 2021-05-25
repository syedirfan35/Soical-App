import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  DELETE_USER,
  CLEAR_ERRORS,
  POSTS_ERROR
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setLoading } from "./postAction";

//register a user
export const register = formData => {
  return async dispatch => {
    const config = {
      headers: {
        ContentType: "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(setLoading());
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

//signin with google
export const signInWithGoogle = () => {
  return async dispatch => {
    try {
      let res = await axios.get("/api/auth/current_user");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      setTimeout(() => {
        dispatch(setLoading());
      }, 1800);
    } catch (err) {
      console.error(err);
    }
  };
};

//load a user
export const loadUser = () => {
  return async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
};

//login
export const login = formData => {
  return async dispatch => {
    const config = {
      headers: {
        ContentType: "application/json"
      }
    };
    try {
      const res = await axios.post("api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };
};
//delete user
export const deleteUser = () => {
  return async dispatch => {
    try {
      await axios.delete("/api/users/remove");
      console.log("deleted successfully");
      dispatch({
        type: DELETE_USER
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POSTS_ERROR,
        payload: err
      });
    }
  };
};

//clear errors
export const clearErrors = () => {
  return async dispatch => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };
};

//LOGOUT
export const logout = () => {
  return async dispatch => {
    try {
      await axios.get("/api/auth/logout");
    } catch (err) {
      console.error(err);
    }
    dispatch({
      type: LOGOUT
    });
  };
};
