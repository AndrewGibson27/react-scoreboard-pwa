/* eslint-disable react/prop-types */

import React from 'react';

export default ({
  game: {
    homeTeam: { name: homeName, winner: homeWinner },
    awayTeam: { name: awayName, winner: awayWinner },
    location,
    homeScore,
    awayScore,
    period,
  },
}) => (
  <section>
    <p>Game being held at {location}</p>
    <p>Period: {period}</p>
    <table>
      <thead>
        <tr>
          <th>{homeName}</th>
          <th>{awayName}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{homeScore} {homeWinner && <span>(w)</span>}</td>
          <td>{awayScore} {awayWinner && <span>(w)</span>}</td>
        </tr>
      </tbody>
    </table>
  </section>
);
