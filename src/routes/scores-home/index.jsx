/* eslint-disable react/prop-types */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Ribbon from './containers/Ribbon';
import Loading from '../../Loading';

const ScoresList = Loadable({
  loader: () => import('../scores-list'),
  loading: Loading,
});

const ScoreDetail = Loadable({
  loader: () => import('../score-detail'),
  loading: Loading,
});

export default props => (
  <section>
    <Ribbon />
    <Switch>
      <Route path={props.match.path} exact component={ScoresList} />
      <Route path={`${props.match.path}/:id`} component={ScoreDetail} />
    </Switch>
  </section>
);
