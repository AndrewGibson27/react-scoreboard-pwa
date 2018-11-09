/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function withCriticalRefetch(WrappedComponent, fetcher) {
  class Wrapper extends Component {
    componentDidUpdate(prevProps) {
      const { location: { pathname: prevPath } } = prevProps;
      const { location: { pathname: currPath } } = this.props;

      if (prevPath !== currPath) {
        fetcher(this.props.match, this.context.store);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  Wrapper.contextTypes = {
    store: PropTypes.object.isRequired,
  };

  return Wrapper;
}
