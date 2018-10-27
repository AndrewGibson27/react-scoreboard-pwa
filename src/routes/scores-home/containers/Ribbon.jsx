/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';

import Score from '../components/Score';

const mapStateToProps = ({ scoresRibbon: { data } }) => ({ data });

const Ribbon = ({ data }) => (
  data.map(({
    _id,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    period,
  }) => (
    <Score
      key={_id}
      homeTeam={homeTeam}
      awayTeam={awayTeam}
      homeScore={homeScore}
      awayScore={awayScore}
      period={period}
    />
  ))
);

export default connect(mapStateToProps)(Ribbon);
