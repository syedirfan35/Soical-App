import React from "react";

import { connect } from "react-redux";
import moment from "moment";

import { removeComment } from "../../actions/postAction";

const CommentItem = ({ comment, postId, removeComment, userData }) => {
  const defaultURL =
    "https://s.clipartkey.com/mpngs/s/152-1520367_user-profile-default-image-png-clipart-png-download.png";
  return (
    <div
      className="bg-white rounded-lg p-3 w-full
     shadow-lg mb-2"
    >
      <div className="flex flex-row">
        <img
          className="w-10 h-10 object-cover rounded-full shadow 
                  cursor-pointer"
          alt="User avatar"
          src={
            comment.postedBy.avatarURL ? comment.postedBy.avatarURL : defaultURL
          }
        />
        <div className="flex flex-col mb-2 ml-4 mt-1">
          <div className="text-gray-600 text-lg font-semibold">
            {comment.postedBy.name}
          </div>
          <div className="flex w-full mt-1">
            <div className="text-gray-600 font-thin text-xs">
              {moment(comment.created).fromNow()}
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-lg ">
        {comment.comment}
        {userData && userData._id === comment.postedBy._id ? (
          <span className="float-right">
            <button
              className="btn block float-right hover:bg-red-500
            border-2 border-red-200 outline-none rounded p-1"
              onClick={() => removeComment(postId, userData._id, comment._id)}
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
          </span>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  userData: state.userData.user
});

export default connect(
  mapStateToProps,
  { removeComment }
)(CommentItem);
