import React from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
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
    errorMessage,
    routeRefresh,
  },
}) => ({
  error,
  errorMessage,
  loading,
  isReady: !error && !loading,
  routeRefresh, // hack to get custom router working
});

const App = ({ error, errorMessage, loading, isReady }) => (
  <main>
    {
      error && <ErrorScreen message={errorMessage} />
    }
    {
      loading && <Loading />
    }
    {
      isReady &&
      <Switch>
        <Route path="/scores" component={ScoresHome} />
        <Route path="/login" exact component={LogIn} />
        <Route path="/admin" exact component={Admin} />
        <Route component={NotFound} />
      </Switch>
    }
  </main>
);

export default connect(mapStateToProps)(App);
