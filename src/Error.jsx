import React from 'react';
import PropTypes from 'prop-types';

const ErrorScreen = ({ message }) => <p>{message}</p>;

ErrorScreen.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorScreen;
