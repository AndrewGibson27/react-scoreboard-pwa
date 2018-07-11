/* eslint-disable react/prop-types */

import React from 'react';

import Loading from '../Loading';
import ErrorHandler from '../Error';

export default ({
  content: {
    data,
    isLoading,
    isFinished,
    didError,
  },
  render,
}) => {
  const shouldShowSpinner = isLoading || !isFinished;

  if (shouldShowSpinner) return <Loading />;
  if (didError) return <ErrorHandler />;
  return render(data);
};
