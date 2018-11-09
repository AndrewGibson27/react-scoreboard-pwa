/* eslint-disable react/prop-types */

import React, { Component } from 'react';

export default function withClientFetch(
  WrappedComponent,
  { refetch } = { refetch: true },
) {
  return class Wrapper extends Component {
    componentDidMount() {
      console.log(this.props);
      this.child.getData();
    }

    componentDidUpdate(prevProps) {
      if (refetch) {
        const { location: { pathname: prevPath } } = prevProps;
        const { location: { pathname: currPath } } = this.props;

        if (prevPath !== currPath) this.child.getData();
      }
    }

    render() {
      return (
        <WrappedComponent
          ref={(instance) => { this.child = instance; }}
          {...this.props}
        />
      );
    }
  };
}
