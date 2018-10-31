/* eslint-disable react/prop-types */

import React from 'react';

import List from './containers/List';

export default ({ match }) => (
  <section>
    <h2>This could be a list of links to get score details</h2>
    <List match={match} />
  </section>
);
