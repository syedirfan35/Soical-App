import axios from "axios";
import { POSTS_ERROR, FIND_PEOPLE } from "./types";
import { loadUser } from "./authAction";

export const updateDetails = formData => {
  return async dispatch => {
    const config = {
      headers: {
        ContentType: "application/json"
      }
    };
    try {
      await axios.post("/api/users/update-details", formData, config);
    } catch (err) {
      console.error(err);
      dispatch({
        type: POSTS_ERROR,
        payload: err
      });
    }
  };
};
export const findPeople = () => {
  return async dispatch => {
    try {
      let res = await axios.get("/api/users/find-people");
      dispatch({
        type: FIND_PEOPLE,
        payload: res.data
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

export const follow = (userId, followId) => {
  return async dispatch => {
    const config = {
      headers: {
        ContentType: "application/json"
      }
    };
    try {
      await axios.put("/api/users/follow", { userId, followId }, config);
      dispatch(findPeople());
      // console.log(result);
      // dispatch({
      //   type: FOLLOW,
      //   payload: res.data
      // })
    } catch (err) {
      console.error(err);
      dispatch({
        type: POSTS_ERROR,
        payload: err
      });
    }
  };
};

export const unFollow = (userId, unfollowId) => {
  return async dispatch => {
    const config = {
      headers: {
        ContentType: "application/json"
      }
    };
    try {
      await axios.put("/api/users/unfollow", { userId, unfollowId }, config);
      dispatch(loadUser());
      // console.log(res.data);
      // dispa1tch({
      //   type: FOLLOW,
      //   payload: res.data
      // })
    } catch (err) {
      console.error(err);
      dispatch({
        type: POSTS_ERROR,
        payload: err
      });
    }
  };
};
