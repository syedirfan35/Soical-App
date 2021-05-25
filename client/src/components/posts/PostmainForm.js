import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addPost } from "../../actions/postAction";
import { loadUser } from "../../actions/authAction";

import PreLoader from "../layout/PreLoader";
import Toast from "../layout/Toast";

const PostmainForm = ({ addPost, userData, postData, loadUser }) => {
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const [post, setPost] = useState({
    postTitle: "",
    postDesc: "",
    image: null
  });

  const [toastShow, setToast] = useState({
    type: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const [previewSource, setPreviewSource] = useState("");
  const { postTitle, postDesc } = post;

  //on change handler
  const onChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  //valid file type
  let validTypes = ["image/jpeg", "image/png"];

  //file handler function
  const fileHandler = e => {
    const selectedFile = e.target.files[0];
    // previewFile(selectedFile);
    if (validTypes.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
        setPost({ ...post, image: reader.result });
      };
    } else {
      setPost({ ...post, image: null });

      setToast({
        ...toastShow,
        type: "warning",
        message: "Please select image of format (jpeg,png) only."
      });
    }
  };

  //submit handler
  const onSubmit = e => {
    e.preventDefault();
    if (!postTitle || !postDesc) {
      setToast({
        ...toastShow,
        type: "warning",
        message: "Please enter all fields to continue!"
      });
    } else {
      //add post action function
      addPost(post, userData.user._id);

      //clear fields
      setPost({
        postTitle: "",
        postDesc: "",
        image: null
      });
      setLoading(true);
    }
  };
  //redirect to homepage
  if (postData.newPostAdded) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>

      <form
        className="editor mx-auto w-10/12 flex flex-col text-gray-800 
      border border-gray-300 p-4 
      shadow-lg max-w-2xl"
        onSubmit={onSubmit}
      >
        <input
          className="title bg-gray-100 border border-gray-300 p-2 
    mb-4 outline-none"
          placeholder="Title"
          type="text"
          name="postTitle"
          value={postTitle}
          onChange={onChange}
        />
        <textarea
          className="description bg-gray-100 sec p-3 
          h-60 border border-gray-300 outline-none"
          placeholder="Describe everything about this post here"
          name="postDesc"
          value={postDesc}
          onChange={onChange}
        ></textarea>

        <div className="mb-2">
          <span>Attachments</span>
          <div
            className="relative h-60 rounded-lg border-dashed border-2 
          border-gray-300 bg-white grid grid-cols-2 
          "
          >
            <div className="text-center mt-10 hover:cursor-pointer">
              <div className="">
                <span className="block text-gray-400 font-normal">
                  Attach your files here
                </span>
                <span className="block text-gray-400 font-normal">or</span>
                <span className="block text-blue-400 font-normal">
                  Browse files
                </span>
              </div>
              <input
                type="file"
                className="h-full w-full opacity-0 hover:cursor-pointer"
                onChange={fileHandler}
              />
            </div>
            <div className="">
              <span>
                {previewSource && (
                  <img
                    src={previewSource}
                    className="w-full h-60 rounded-lg rounded-b-none 
                    object-contain
                     "
                    alt="sjkjsdk"
                  />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center text-gray-500">
            <span>Accepted file type:.jpg, .jpeg, .png only</span>
            <span className="flex items-center ">
              <i className="fa fa-lock mr-1"></i> secure
            </span>
          </div>
        </div>
        <div className="buttons">
          <button
            className="btn border border-indigo-500 p-1 px-4 
          font-semibold cursor-pointer text-white 
          bg-indigo-500 float-right rounded"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
      {toastShow.message.length > 0 ? (
        <Toast toastProp={toastShow} setToast={setToast} />
      ) : null}
      {loading && <PreLoader />}
    </div>
  );
};

const mapStateToProps = state => ({
  userData: state.userData,
  postData: state.postsData
});

export default connect(
  mapStateToProps,
  { addPost, loadUser }
)(PostmainForm);
