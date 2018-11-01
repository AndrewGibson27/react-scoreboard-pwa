/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuthRedirect = (WrappedComponent) => {
  const AuthRedirect = (props) => {
    if (!props.isAdmin) return <Redirect to="/login" />;
    return <WrappedComponent {...props} />;
  };

  const mapStateToProps = ({
    user: { data: { isAdmin } },
  }) => ({ isAdmin });

  return connect(mapStateToProps)(AuthRedirect);
};

export default withAuthRedirect;
