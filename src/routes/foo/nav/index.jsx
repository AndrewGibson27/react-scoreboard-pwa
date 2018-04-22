import React from 'react';

import loadData from '../../../store/baz/actions';

const FooNavRoute = () => (
  <h1>Foo nav route!</h1>
);

FooNavRoute.fetchData = (params, { dispatch }) => (
  dispatch(loadData())
);

export default FooNavRoute;
