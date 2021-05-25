import {
  GET_POSTS,
  GET_POST,
  GET_FEED,
  POSTS_ERROR,
  ADD_POST,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  DELETE_POST,
  SET_LOADING
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const getPosts = () => {
  return async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/posts");

      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//get single post
export const getPost = postId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/posts/${postId}`);

      dispatch({
        type: GET_POST,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: POSTS_ERROR,
        payload: err
      });
    }
  };
};

//feeds
export const feedPosts = userId => {
  return async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(`/api/posts/feed/${userId}`);

      dispatch({
        type: GET_FEED,
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

//adding a new post
export const addPost = (formData, userId) => {
  return async dispatch => {
    const config = {
      headers: {
        ContentType: "application/json"
      }
    };

    try {
      const res = await axios.post(
        `/api/posts/new/${userId}`,
        formData,
        config
      );

      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: POSTS_ERROR,
        payload: err
      });
    }
  };
};

//deleting a post
export const deletePost = postId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch({
        type: DELETE_POST,
        payload: postId
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: POSTS_ERROR,
        payload: err
      });
    }
  };
};

//add like
export const addLike = (postId, userId) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);

      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: res.data }
      });
      dispatch(feedPosts(userId));
    } catch (err) {
      console.log(err);
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err }
      });
    }
  };
};

//removes a  like
export const removeLike = (postId, userId) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);

      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: res.data }
      });
      dispatch(feedPosts(userId));
    } catch (err) {
      console.log(err);

      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err }
      });
    }
  };
};

//add comment
export const addComment = (postId, userId, formData) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );
      dispatch({
        type: ADD_COMMENT,
        payload: { postId, comments: res.data }
      });
      dispatch(feedPosts(userId));
    } catch (err) {
      console.log(err);
      dispatch({
        type: POSTS_ERROR,
        payload: err
      });
    }
  };
};

//remove comment
export const removeComment = (postId, userId, commentId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/posts/uncomment/${postId}/${commentId}`);
      dispatch({
        type: REMOVE_COMMENT,
        payload: { postId, commentId }
      });
      dispatch(feedPosts(userId));
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: err
      });
    }
  };
};

export const setLoading = () => {
  return dispatch => {
    try {
      dispatch({
        type: SET_LOADING
      });
    } catch (err) {
      console.error(err);
    }
  };
};
