import React from "react";
import "./modal.css";

const PostModalForm = () => {
  return (
    <div
      className="flex justify-center h-screen items-center 
    bg-gray-200"
      id="formModal"
    >
      <div
        className="flex flex-col w-11/12 
      sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg 
      border border-gray-300 shadow-xl"
        id="modal-content"
      >
        <div
          className="flex flex-row justify-between p-6 
        bg-white border-b border-gray-200 
        rounded-tl-lg rounded-tr-lg close"
        >
          <p className="font-semibold text-gray-800">Add a step</p>
          <svg
            className="w-6 h-6 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col px-6 py-5 bg-gray-50">
          <p className="mb-2 font-semibold text-gray-700">Title of Post</p>
          <input
            className="title bg-white border border-gray-200 p-4 rounded 
            mb-4 shadow-sm"
            placeholder="Title"
            type="text"
          />
          <p className="mb-2 font-semibold text-gray-700">Bots Message</p>
          <textarea
            type="text"
            name=""
            placeholder="Type message..."
            className="p-5 mb-5 bg-white border border-gray-200 
            rounded shadow-sm h-36"
            id=""
          ></textarea>
        </div>
        <div
          className=" 
        p-5 bg-white border-t border-gray-200 
        rounded-bl-lg rounded-br-lg"
        >
          <button
            className="px-4 py-2 text-white font-semibold 
          bg-blue-500 rounded float-right"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModalForm;
