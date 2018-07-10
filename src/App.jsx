import React from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import ErrorScreen from './Error';
import Loading from './Loading';

const ScoresRibbon = Loadable({
  loader: () => import('./routes/ribbon').then(object => object.default),
  loading: Loading,
});

const ScoresList = Loadable({
  loader: () => import('./routes/list').then(object => object.default),
  loading: Loading,
});

const mapStateToProps = ({ context: { error, loading, errorMessage } }) => {
  const isReady = !error && !loading;
  return { error, errorMessage, loading, isReady };
};

const App = ({ error, errorMessage, loading, isReady }) => (
  <main>
    {error && <ErrorScreen message={errorMessage} />}
    {loading && <Loading />}
    {
      isReady &&
      <div>
        <nav>
          <Route path="/scores" component={ScoresRibbon} />
        </nav>
        <Switch>
          <Route path="/scores" exact component={ScoresList} />
          <Redirect to="/scores" />
        </Switch>
      </div>
    }
  </main>
);

export default connect(mapStateToProps)(App);
