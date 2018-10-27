/* eslint-disable react/prop-types */

import React from 'react';

export default ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  period,
}) => (
  <div>
    <h1>Home team: {homeTeam.name}</h1>
  </div>
);
