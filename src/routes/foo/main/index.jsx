import React from 'react';

import loadData from '../../../store/bar/actions';

const FooMainRoute = () => (
  <h1>Foo main route!</h1>
);

FooMainRoute.fetchData = (params, { dispatch }) => (
  dispatch(loadData())
);

export default FooMainRoute;
