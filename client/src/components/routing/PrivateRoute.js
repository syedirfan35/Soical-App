import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ userData, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !userData.isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
