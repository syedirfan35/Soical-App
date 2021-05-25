import React, { useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import moment from "moment";

import CommentItem from "./CommentItem";
import Toast from "../layout/Toast";

import {
  getPosts,
  addLike,
  removeLike,
  addComment,
  deletePost
} from "../../actions/postAction";

const PostItem = ({
  postData,
  addLike,
  removeLike,
  addComment,
  deletePost,
  userId
}) => {
  const {
    likes,
    comments,
    created,
    postTitle,
    posterName,
    postedBy,
    postDesc,
    postImageURL,
    _id
  } = postData;
  const [comment, setComment] = useState("");

  const [toastShow, setToast] = useState({
    type: "",
    message: ""
  });
  const defaultURL =
    "https://s.clipartkey.com/mpngs/s/152-1520367_user-profile-default-image-png-clipart-png-download.png";

  //on change comment handler
  const onChange = e => {
    setComment(e.target.value);
  };
  //on submit handler
  const onSubmit = e => {
    e.preventDefault();
    if (!comment) {
      setToast({
        ...toastShow,
        type: "warning",
        message: "Please enter a comment!"
      });
    } else {
      addComment(_id && _id, userId._id, { comment });
      setComment("");
    }
  };

  return _id ? (
    <motion.div className="m-2 my-4" layout>
      <div
        className="flex max-w-xl  rounded-lg overflow-hidden mx-auto
        border-2 border-gray-200"
      >
        <div className="flex items-center w-full">
          <div className="w-full">
            <div className="flex mt-2 px-2 py-3 mx-3">
              <div className="w-auto h-auto rounded-full">
                <img
                  className="w-12 h-12 object-cover rounded-full shadow 
                  cursor-pointer"
                  alt="User avatar"
                  src={
                    postedBy && postedBy.avatarURL && postedBy.avatarURL
                      ? postedBy.avatarURL
                      : defaultURL
                  }
                />
              </div>
              <div className="flex flex-col mb-2 ml-4 mt-1">
                <div className="text-gray-600 text-lg font-semibold">
                  {posterName}
                </div>
                <div className="flex w-full mt-1">
                  <div className="text-gray-600 font-thin text-xs">
                    {moment(created).fromNow()}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-100"></div>
            <div
              className="text-gray-400 
            font-medium text-sm mb-7 mt-6 mx-3 px-2"
            >
              <motion.img
                className="rounded"
                src={postImageURL}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </div>
            <div className="text-gray-600 font-semibold text-lg mb-2 mx-3 px-2">
              {postTitle}
            </div>
            <div className="text-gray-500 font-thin text-sm mb-6 mx-3 px-2">
              {postDesc}
            </div>

            <div className="flex w-full border-t border-gray-100">
              <div className="mt-3 mx-5 flex flex-row">
                <div className="flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center">
                  <span className="material-icons">comment_bank</span>Comments:
                  <div className="ml-1 text-gray-400 font-thin text-ms">
                    {comments && comments.length}
                  </div>
                </div>
              </div>
              <div className="mt-3 mx-5 w-full flex justify-end">
                <div
                  className="flex text-gray-700 
                font-normal text-sm rounded-md mb-2 mr-4 items-center"
                >
                  <span
                    className="material-icons cursor-pointer rounded-lg
                    block bg-white px-2 py-2 border border-gray-300
                    hover:bg-green-400"
                    onClick={() => addLike(_id && _id, userId && userId._id)}
                  >
                    thumb_up_alt
                  </span>

                  <span
                    className="ml-1 material-icons cursor-pointer rounded-lg
                    block bg-white p-2 border border-gray-300
                    hover:bg-red-500"
                    onClick={() => removeLike(_id && _id, userId && userId._id)}
                  >
                    thumb_down_alt
                  </span>
                  <div className="ml-1  ">
                    {likes && likes.length > 0 && <span>{likes.length}</span>}
                  </div>
                </div>
              </div>
              {userId && userId._id && userId._id === postedBy._id ? (
                <div className="mx-auto mt-4 mr-4">
                  <button
                    className="btn p-1 rounded-lg border-2
                  border-red-100 hover:bg-red-500"
                    onClick={() => deletePost(_id && _id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            {comments.length > 0 && (
              <div className="overflow-y-auto h-32 border-t border-gray-200">
                {comments.length > 0 &&
                  comments.map(comment => (
                    <CommentItem
                      comment={comment}
                      key={comment._id}
                      postId={_id && _id}
                    />
                  ))}
              </div>
            )}

            <form
              className="relative flex items-center 
            self-center w-full max-w-xl p-4 overflow-hidden 
            text-gray-600 focus-within:text-gray-400"
              onSubmit={onSubmit}
            >
              <img
                className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                alt="User avatar"
                src={
                  userId && userId.avatarURL && userId.avatarURL
                    ? userId.avatarURL
                    : defaultURL
                }
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                <button
                  type="submit"
                  className="p-1 focus:outline-none rounded hover:bg-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                className="w-full py-2 pl-4 pr-10 text-sm 
                bg-gray-100 border border-transparent 
                appearance-none rounded-lg placeholder-gray-400 
                focus:bg-white focus:outline-none 
                focus:border-blue-500 focus:text-gray-900 
                focus:shadow-outline-blue"
                placeholder="Post a comment..."
                autoComplete="off"
                name="comment"
                value={comment}
                onChange={onChange}
              />
            </form>
          </div>
        </div>
      </div>
      {toastShow.message.length > 0 ? (
        <Toast toastProp={toastShow} setToast={setToast} />
      ) : null}
    </motion.div>
  ) : null;
};

const mapStateToProps = state => ({
  userId: state.userData.user
});

export default connect(
  mapStateToProps,
  { getPosts, addLike, removeLike, addComment, deletePost }
)(PostItem);
