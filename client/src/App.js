import React, { useEffect, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { loadUser, signInWithGoogle } from "./actions/authAction";

import PrivateRoute from "./components/routing/PrivateRoute";

import Home from "./components/screens/Home";
import Navbar from "./components/layout/NavBar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PostmainForm from "./components/posts/PostmainForm";
import Profile from "./components/screens/Profile";
import MyPosts from "./components/posts/MyPosts";
import PostButton from "./components/posts/PostButton";
import Follow from "./components/posts/Follow";
import EditProfile from "./components/posts/EditProfile";
import PageNotFound from "./components/pages/PageNotFound";

const App = ({ loadUser, userData, signInWithGoogle }) => {
  useEffect(() => {
    signInWithGoogle();
    loadUser();
  }, [loadUser, signInWithGoogle]);

  return (
    <Fragment>
      <Navbar />
      {userData && userData.isAuthenticated ? <PostButton /> : null}

      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/add-post" component={PostmainForm} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/my-posts" component={MyPosts} />
        <PrivateRoute exact path="/find-people" component={Follow} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(
  mapStateToProps,
  { loadUser, signInWithGoogle }
)(App);
