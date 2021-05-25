import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/authAction";

const NavBar = ({ logout, userData }) => {
  useEffect(() => {
    let nav_items = document.getElementById("nav-items");
    nav_items.classList.add("hidden");
  });
  const { isAuthenticated } = userData;

  const toggleBtnHandler = () => {
    let nav_items = document.getElementById("nav-items");
    nav_items.classList.toggle("hidden");
  };
  const defaultURL =
    "https://s.clipartkey.com/mpngs/s/152-1520367_user-profile-default-image-png-clipart-png-download.png";

  const guestLinks = (
    <div className="flex items-center py-2 -mx-1 md:mx-0">
      <Link
        className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-blue-600 md:mx-2 md:w-auto"
        to="/login"
      >
        Login
      </Link>
      <Link
        className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium 
        leading-5 text-center text-white transition-colors 
        duration-200 transform bg-blue-500 
        rounded-md hover:bg-blue-600 md:mx-0 md:w-auto"
        to="/register"
      >
        Register
      </Link>
    </div>
  );

  const authLinks = (
    <div className="flex items-center py-2 -mx-1 md:mx-0">
      <button
        className="block w-1/2 px-3 py-2 mx-1
         text-sm font-medium
         leading-5 text-center text-white 
         transition-colors duration-200 transform 
         bg-red-500 rounded-md hover:bg-blue-400 md:mx-0 md:w-auto"
        type="button"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );

  const authNavItems = (
    <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
      <Link
        className="my-1 text-sm font-semibold leading-5 text-gray-700 
        hover:text-blue-600
        hover:underline md:mx-4 md:my-0"
        to="/"
      >
        Your Feed
      </Link>

      <Link
        className="my-1 text-sm font-semibold leading-5 text-gray-700 
        hover:text-blue-600
        hover:underline md:mx-4 md:my-0"
        to="/my-posts"
      >
        My Posts
      </Link>
      <Link
        className="my-1 text-sm font-semibold leading-5 text-gray-700 
        hover:text-blue-600
        hover:underline md:mx-4 md:my-0"
        to="/add-post"
      >
        Add Post
      </Link>
      <Link
        className="my-1 text-sm font-semibold leading-5 text-gray-700 
        hover:text-blue-600
        hover:underline md:mx-4 md:my-0"
        to="/find-people"
      >
        Find People
      </Link>

      <Link
        className="my-1 text-sm font-semibold leading-5 text-gray-700 
        hover:text-blue-600
        hover:underline md:mx-4 md:my-0"
        to="/profile"
      >
        View Profile
      </Link>
      <Link
        className="my-1 text-sm font-semibold leading-5 text-gray-700 
        hover:text-blue-600
        hover:underline md:mx-4 md:my-0"
        to="/edit-profile"
      >
        Edit Profile
      </Link>
      <div>
        <img
          alt="profil"
          src={
            userData.user && userData.user.avatarURL
              ? userData.user.avatarURL
              : defaultURL
          }
          className=" object-cover rounded-full h-8 w-8 md:mx-4 md:my-0 "
        />
      </div>
    </div>
  );

  return (
    <div>
      <nav className="bg-white shadow dark:bg-gray-800 mb-5">
        <div className="container px-6 py-3 mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="https://res.cloudinary.com/dk2jrkbwg/image/upload/v1621674099/xing-pngrepo-com_usk2r7.png"
                  className=" h-8 w-8 mr-2"
                  alt=""
                />
                <Link
                  className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
                  to="/"
                >
                  Social-App
                </Link>
              </div>

              <div className="flex md:hidden" onClick={toggleBtnHandler}>
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="items-center md:flex " id="nav-items">
              {isAuthenticated ? authNavItems : null}
              <div className="">{isAuthenticated ? authLinks : guestLinks}</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
