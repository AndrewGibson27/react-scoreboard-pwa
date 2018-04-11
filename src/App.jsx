import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loader = () => (
  <p>Loading...</p>
);

const AdminRoute = Loadable({
  loader: () => import('./routes/admin'),
  loading: Loader,
});

const FooRoute = Loadable({
  loader: () => import('./routes/foo'),
  loading: Loader,
});

export default () => (
  <Switch>
    <Route exact path="/" component={AdminRoute} />
    <Route path="/foo" component={FooRoute} />
  </Switch>
);
