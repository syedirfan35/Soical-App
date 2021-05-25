import React from "react";
import { connect } from "react-redux";
import Posts from "./Posts";

const MyPosts = ({ userData }) => {
  return <div>{userData ? <Posts /> : null}</div>;
};

const mapStateToProps = state => ({
  userData: state.userData.user
});

export default connect(
  mapStateToProps,
  null
)(MyPosts);
