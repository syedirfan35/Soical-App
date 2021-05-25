import React, { useEffect } from "react";

import PostItem from "../posts/PostItem";

import { connect } from "react-redux";
import { feedPosts } from "../../actions/postAction";

import PreLoader from "../layout/PreLoader";

const Feed = ({ feedPosts, feed, userId, isLoading }) => {
  useEffect(() => {
    if (userId) {
      feedPosts(userId._id);
    }
  }, [feedPosts, userId]);

  return isLoading ? (
    <PreLoader />
  ) : (
    <div>
      {feed.length === 0 ? (
        <p>Start following some one to get feed...</p>
      ) : (
        feed.map(postData => (
          <PostItem postData={postData} key={postData._id} />
        ))
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  feed: state.postsData.feed,
  userId: state.userData.user,
  isLoading: state.postsData.loading
});

export default connect(
  mapStateToProps,
  { feedPosts }
)(Feed);
