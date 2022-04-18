import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadUser } from "../../actions/authActions";

const PrivateRoute = ({ children, auth, loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const { isAuthenticated, loading } = auth;

  return !isAuthenticated && !loading ? <Navigate to='/login' /> : children;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { loadUser })(PrivateRoute);
