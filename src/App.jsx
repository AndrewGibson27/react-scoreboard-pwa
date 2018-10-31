import React from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import ErrorScreen from './Error';
import Loading from './Loading';

const ScoresHome = Loadable({
  loader: () => import('./routes/scores-home'),
  loading: Loading,
});

const LogIn = Loadable({
  loader: () => import('./routes/login'),
  loading: Loading,
});

const Admin = Loadable({
  loader: () => import('./routes/admin'),
  loading: Loading,
});

const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
});

const mapStateToProps = ({
  context: {
    error,
    loading,
  },
}) => ({
  error,
  loading,
  isReady: !error && !loading,
});

const App = ({ error, loading, isReady }) => (
  <main>
    {
      error && <ErrorScreen />
    }
    {
      loading && <Loading />
    }
    {
      isReady &&
      <div>
        <nav>
          <Link to="/login">Log In</Link>
          <br />
          <Link to="/admin">Admin</Link>
        </nav>
        <Switch>
          <Route path="/scores" component={ScoresHome} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/admin" exact component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </div>
    }
  </main>
);

export default withRouter(connect(mapStateToProps)(App));
