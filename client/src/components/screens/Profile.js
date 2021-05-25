import React, { useEffect } from "react";

import { connect } from "react-redux";

import { unFollow } from "../../actions/userAction";
import { loadUser, deleteUser } from "../../actions/authAction";

const Profile = ({ userData, unFollow, loadUser, deleteUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const unFollowHandler = id => {
    unFollow(userData._id, id);
  };
  const defaultURL =
    "https://s.clipartkey.com/mpngs/s/152-1520367_user-profile-default-image-png-clipart-png-download.png";
  return userData ? (
    <div className="container mx-auto my-5 p-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-5/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-blue-400">
            <div className="image overflow-hidden">
              <img
                className="h-auto w-full mx-auto"
                src={
                  userData.avatarURL && userData.avatarURL
                    ? userData.avatarURL
                    : defaultURL
                }
                alt="personpic"
              />
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
              {userData.name}
            </h1>
            <h3 className="text-gray-600 font-lg text-semibold leading-6">
              {userData.bio}
            </h3>

            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                </span>
              </li>

              <li className="flex items-center py-3">
                <span>Delete Your Account</span>
                <span className="ml-auto">
                  <span
                    className="bg-red-500 py-1 px-2 rounded text-white 
                  text-sm cursor-pointer"
                    onClick={() => deleteUser()}
                  >
                    Delete
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-9/12 mx-2 h-64">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="tracking-wide">Followers</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                {userData.followers.map(f => (
                  <div
                    className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 
                  p-4"
                    key={f._id}
                  >
                    <div className="flex-row gap-4 flex justify-center items-center">
                      <div className="flex-shrink-0">
                        <div className="block relative">
                          <img
                            alt="profil"
                            src={
                              f.avatarURL && f.avatarURL
                                ? f.avatarURL
                                : defaultURL
                            }
                            className="mx-auto object-cover rounded-full h-16 w-16 "
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col">
                        <span className="text-gray-600 dark:text-white text-lg font-medium">
                          {f.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex items-center space-x-2 
            font-semibold text-gray-900 leading-8 mt-2"
            >
              <span className="tracking-wide">Following:</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                {userData.following.map(f => (
                  <div
                    className="shadow-lg rounded-2xl bg-white 
                    m-2 
                  p-4"
                    key={f._id}
                  >
                    <div className="flex-row gap-4 flex justify-center items-center">
                      <div className="flex-shrink-0">
                        <div className="block relative">
                          <img
                            alt="profil"
                            src={
                              f.avatarURL && f.avatarURL
                                ? f.avatarURL
                                : defaultURL
                            }
                            className="mx-auto object-cover rounded-full h-16 w-16 "
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col">
                        <span className="text-gray-600 dark:text-white text-lg font-medium">
                          {f.name}
                        </span>
                        <button
                          type="button"
                          className="px-4 py-2 text-base border rounded-lg 
                        text-white bg-red-500 hover:bg-red-700 "
                          onClick={() => unFollowHandler(f._id)}
                        >
                          UnFollow
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

const mapStateToProps = state => ({
  userData: state.userData.user
});

export default connect(
  mapStateToProps,
  { unFollow, loadUser, deleteUser }
)(Profile);
