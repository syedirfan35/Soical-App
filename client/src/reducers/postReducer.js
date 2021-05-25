import {
  GET_POSTS,
  GET_FEED,
  POSTS_ERROR,
  ADD_POST,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  DELETE_POST,
  SET_LOADING
} from "../actions/types";

const initialState = {
  posts: [],
  feed: [],
  loading: true,
  error: null,
  findPeople: null,
  newPostAdded: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        newPostAdded: false,
        loading: false
      };

    case GET_FEED:
      return {
        ...state,
        feed: action.payload,
        loading: false
      };

    case ADD_POST:
      return {
        ...state,
        newPostAdded: true,
        posts: [action.payload]
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };

    case POSTS_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        )
      };

    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.postId
            ? { ...post, comments: action.payload.comments }
            : post
        )
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  comment => comment._id !== action.payload.commentId
                )
              }
            : post
        )
      };
    case SET_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
