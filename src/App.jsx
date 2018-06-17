import React from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

const Loader = () => <p>Loading...</p>;

const AdminRoute = Loadable({
  loader: () => import('./routes/admin').then(object => object.default),
  loading: Loader,
});

const FooNavRoute = Loadable({
  loader: () => import('./routes/foo/nav').then(object => object.default),
  loading: Loader,
});

const FooMainRoute = Loadable({
  loader: () => import('./routes/foo/main').then(object => object.default),
  loading: Loader,
});

const mapStateToProps = ({ context: { error, loading } }) => {
  return { error, loading };
};

const App = ({ error, loading }) => (
  <main>
    <p>{loading.toString()}</p>
    {error && <p>Oh no!!!</p>}
    {loading && <p>Loading!!!</p>}
    {(!error && !loading) &&
      <div>
        <nav>
          <Route path="/foo" component={FooNavRoute} />
        </nav>
        <div>
          <NavLink to="/foo">Go to foo</NavLink>
        </div>
        <Switch>
          <Route path="/" exact component={AdminRoute} />
          <Route path="/foo" component={FooMainRoute} />
          <Redirect to="/" />
        </Switch>
      </div>
    }
  </main>
);

export default connect(mapStateToProps)(App);
