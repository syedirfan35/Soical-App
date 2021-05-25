import React from "react";

import Feed from "../posts/Feed";

const Home = () => {
  return (
    <div>
      <p className="text-gray-600 text-lg font-semibold mx-4 my-2">
        Your Feed:
      </p>
      <Feed />
    </div>
  );
};

export default Home;
