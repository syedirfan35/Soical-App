import React, { Fragment, useEffect } from "react";
import PostItem from "./PostItem";

import { connect } from "react-redux";
import { getPosts } from "../../actions/postAction";
import PreLoader from "../layout/PreLoader";

const Posts = ({ getPosts, posts, isLoading,userData }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return isLoading ? (
    <PreLoader />
  ) : (
    <Fragment>
      <div>
        {posts && posts.length === 0 ? (
          <p>No post to show</p>
        ) : (
          (posts && userData) &&
          posts.map(postData => (
            <PostItem postData={postData} key={postData._id} />
          ))
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  posts: state.postsData.posts,
  isLoading: state.postsData.loading,
  userData: state.userData.user
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
