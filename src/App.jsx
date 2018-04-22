import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loader = () => (
  <p>Loading...</p>
);

const AdminRoute = Loadable({
  loader: () => import('./routes/admin'),
  loading: Loader,
});

const FooNavRoute = Loadable({
  loader: () => import('./routes/foo/nav'),
  loading: Loader,
});

const FooMainRoute = Loadable({
  loader: () => import('./routes/foo/main'),
  loading: Loader,
});

export default () => (
  <main>
    <nav>
      <Route path="/foo" component={FooNavRoute} />
    </nav>
    <Switch>
      <Route path="/" exact component={AdminRoute} />
      <Route path="/foo" component={FooMainRoute} />
      <Redirect to="/" />
    </Switch>
  </main>
);
