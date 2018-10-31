import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = ({ context: { message } }) => ({ message });

const ErrorScreen = ({ message }) => <p>{message}</p>;

ErrorScreen.propTypes = {
  message: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ErrorScreen);
