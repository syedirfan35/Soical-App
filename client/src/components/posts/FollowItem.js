import React from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";

import { follow } from "../../actions/userAction";

const FollowItem = ({ data, follow, userData }) => {
  const defaultURL =
    "https://s.clipartkey.com/mpngs/s/152-1520367_user-profile-default-image-png-clipart-png-download.png";
  return (
    <motion.div
      className="rounded-2xl w-80 p-4 border-2 border-indigo-200"
      layout
    >
      <div className="flex flex-row items-start gap-4">
        <img
          src={data.avatarURL && data.avatarURL ? data.avatarURL : defaultURL}
          className="w-28 h-28 rounded-lg"
          alt="person pic"
        />
        <div className="h-28 w-full flex flex-col justify-between ml-2">
          <div>
            <p className="text-gray-800 dark:text-white text-xl font-medium">
              {data.name}
            </p>
          </div>
          <div className="rounded-lg bg-blue-100 dark:bg-white p-2 w-full">
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-black">
              <p className="flex flex-col">
                Followers
                <span className="text-black dark:text-indigo-500 font-bold">
                  {data.followers.length}
                </span>
              </p>
              <p className="flex flex-col">
                Following
                <span className="text-black dark:text-indigo-500 font-bold">
                  {data.following.length}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-6">
        <button
          type="button"
          className="w-1/2 px-4 py-2 text-base border rounded-lg 
          text-white bg-indigo-500 hover:bg-indigo-700 "
          onClick={() => follow(userData._id, data._id)}
        >
          follow
        </button>
      </div>
    </motion.div>
  );
};

const mapStateToProps = state => ({
  userData: state.userData.user
});

export default connect(
  mapStateToProps,
  { follow }
)(FollowItem);
