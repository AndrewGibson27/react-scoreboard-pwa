/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';

import Score from '../components/Score';

const mapStateToProps = ({ scoresRibbon: { data } }) => ({ data });

const Ribbon = ({ data }) => (
  <div style={{ marginBottom: '100px' }}>
    <h2>This could be a scores carousel like you see on ESPN.com</h2>
    <ul>
      {
        data.map(({
          _id,
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
        }) => (
          <li key={_id}>
            <Score
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              homeScore={homeScore}
              awayScore={awayScore}
            />
          </li>
        ))
      }
    </ul>
  </div>
);

export default connect(mapStateToProps)(Ribbon);
