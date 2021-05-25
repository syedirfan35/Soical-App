import React from "react";
import "./preLoader.css";
const PreLoader = () => {
  const style = {
    top: "50%"
  };
  return (
    <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
      <div
        className="text-blue-500
          top-1/2 my-0 mx-auto block relative w-0 h-0"
        style={style}
      >
        <div className="spinner-3"></div>
      </div>
    </div>
  );
};

export default PreLoader;
