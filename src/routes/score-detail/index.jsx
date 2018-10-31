/* eslint-disable react/prop-types */

import React from 'react';

import Detail from './containers/Detail';

export default ({ match }) => (
  <section>
    <h2>And this is the score detail!</h2>
    <Detail match={match} />
  </section>
);
