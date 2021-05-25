import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { register } from "../../actions/authAction";
import Toast from "../layout/Toast";
// import { toastHandler } from "../layout/toastFunc";

const Register = ({ register, userData }) => {
  const { isAuthenticated, error } = userData;

  const [toastShow, setToast] = useState({
    type: "",
    message: ""
  });
  //useeffect
  useEffect(() => {
    if (isAuthenticated) {
      setToast({
        ...toastShow,
        type: "warning",
        message: "Please enter a paaword with more than 7 characters!"
      });
    } else if (error === "User already exists!") {
      setToast({
        ...toastShow,
        type: "error",
        message: "User already exists!"
      });
    }
  }, [isAuthenticated, error, toastShow]);
  //usestate
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  //destructuring
  const { name, email, password, password2 } = user;

  //onchangehandler
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //onsubmit handler
  const onSubmit = e => {
    e.preventDefault();
    if (!name || !email || !password || !password2) {
      // return <Toast />;
      console.log("Please enter all fields");
      // setWarningToast("Please enter all fields to continue!");
      setToast({
        ...toastShow,
        type: "warning",
        message: "Please enter all fields to continue!"
      });
    } else if (password !== password2) {
      // alert("Password dosen't match");
      setToast({
        ...toastShow,
        type: "warning",
        message: "Please confirm your password!"
      });
    } else if (password.length <= 6 || password2.length <= 6) {
      setToast({
        ...toastShow,
        type: "warning",
        message: "Please enter a paaword with more than 7 characters!"
      });
    }
    register({
      name,
      email,
      password
    });
    //clear fields
    setUser({
      name: "",
      email: "",
      password: "",
      password2: ""
    });
    // setWarningToast(null);
  };
  //redirect to home page
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <section className="flex flex-col md:flex-row h-screen items-center mt-10">
        {/* <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="w-full h-full object-cover"
          />
        </div> */}

        <div
          className="bg-gray-50 shadow-2xl
          border-rounded-l w-full 
          md:max-w-md lg:max-w-full 
          md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen 
          px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div
            className="w-full h-100  
          "
          >
            <h1
              className="text-2xl
             md:text-2xl
             sm:text-2xl 
             font-bold leading-tight text-center"
            >
              Please <span className="text-blue-700">Register </span> to
              Continue{" "}
            </h1>

            <form className="mt-6" onSubmit={onSubmit}>
              <div>
                <label className="block text-gray-700 text-lg">Full Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={onChange}
                  value={name}
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-3
                   rounded-lg bg-gray-200 
                   mt-2 border
                  focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block mt-3 text-gray-700 text-lg">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={email}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg 
                  bg-gray-200 mt-2 border 
                  focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-lg">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={password}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block mt-3 text-gray-700 text-lg">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password2"
                  onChange={onChange}
                  value={password2}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full block bg-indigo-500 text-lg hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Register
              </button>
            </form>

            <hr className="my-6 border border-gray-300 w-full" />

            <a
              href="/api/auth/google"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="0.98em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 256 262"
                >
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  />
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  />
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  />
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  />
                </svg>
                <span className="ml-4 ">Continue with Google</span>
              </div>
            </a>

            <p className="m-8">
              Have an Account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Than Login
              </Link>
            </p>
          </div>
        </div>
      </section>
      {toastShow.message.length > 0 ? (
        <Toast toastProp={toastShow} setToast={setToast} />
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
