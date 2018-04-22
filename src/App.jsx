import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loader = () => (
  <p>Loading...</p>
);

const AdminRoute = Loadable({
  loader: () => import(/* webpackChunkName: "adminRoute" */ './routes/admin').then(object => object.default),
  loading: Loader,
});

const FooNavRoute = Loadable({
  loader: () => import(/* webpackChunkName: "fooNavRoute" */ './routes/foo/nav').then(object => object.default),
  loading: Loader,
});

const FooMainRoute = Loadable({
  loader: () => import(/* webpackChunkName: "fooMainRoute" */ './routes/foo/main').then(object => object.default),
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
