/* eslint-disable react/prop-types */

import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  period,
}) => (
  <div>
    <h1>Home team: {homeTeam.name}</h1>
    <Link to="/login">Log in</Link>
  </div>
);
