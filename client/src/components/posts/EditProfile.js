import React, { useState } from "react";
import { connect } from "react-redux";

import { updateDetails } from "../../actions/userAction";

import Toast from "../layout/Toast";

const EditProfile = ({ updateDetails }) => {
  const [data, setData] = useState({
    avatarURL: "",
    bio: "",
    age: "",
    phoneNumber: "",
    gender: ""
  });
  const [toastShow, setToast] = useState({
    type: "",
    message: ""
  });

  const { bio, age, phoneNumber, gender } = data;

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //valid file type
  let validTypes = ["image/jpeg", "image/png"];

  //file handler function
  const fileHandler = e => {
    const selectedFile = e.target.files[0];
    if (validTypes.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setData({ ...data, avatarURL: reader.result });
      };
    } else {
      setData({ ...data, avatarURL: null });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!bio || !age || !phoneNumber || !gender) {
      setToast({
        ...toastShow,
        type: "warning",
        message: "Please enter all fields to continue!"
      });
    } else if (phoneNumber.length < 10) {
      setToast({
        ...toastShow,
        type: "warning",
        message: "Phone number must be valid!"
      });
    } else {
      updateDetails(data);
      setData({
        avatarURL: "",
        bio: "",
        age: "",
        phoneNumber: "",
        gender: ""
      });
      setToast({
        ...toastShow,
        type: "success",
        message: "Details updated successfully!"
      });
    }
  };

  return (
    <section className="h-screen bg-gray-100 bg-opacity-50">
      <form
        className="container max-w-2xl mx-auto
       shadow-md md:w-3/4"
        onSubmit={onSubmit}
      >
        <div className="p-4 bg-gray-200 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <h1 className="text-gray-600 text-2xl">Edit Details</h1>
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Avatar (profile pic)</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className=" relative ">
                <input type="file" onChange={fileHandler} />
              </div>
              <div></div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Personal info</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <input
                  type="text"
                  name="bio"
                  value={bio}
                  onChange={onChange}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Bio (or) description"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={onChange}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Age"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChange}
                  className=" rounded-lg border-transparent flex-1 
                  appearance-none border border-gray-300 w-full py-2 px-4 
                  bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <select
                  className="
                 rounded-lg border-transparent flex-1 
                  border border-gray-300 w-full py-2 px-4
                  bg-white focus:text-gray-700 text-gray-400 
                  shadow-sm text-base focus:outline-none "
                  name="gender"
                  value={gender}
                  onChange={onChange}
                >
                  <option value="" className="text-gray-400">
                    Select an option
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              type="submit"
              className="py-2 px-4  
              bg-blue-600 hover:bg-blue-700 
              focus:ring-blue-500 focus:ring-offset-blue-200 
              text-white w-full transition ease-in duration-200 
              text-center text-base font-semibold shadow-md 
              focus:outline-none focus:ring-2 focus:ring-offset-2  
              rounded-lg "
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {toastShow.message.length > 0 ? (
        <Toast toastProp={toastShow} setToast={setToast} />
      ) : null}
    </section>
  );
};

export default connect(
  null,
  { updateDetails }
)(EditProfile);
