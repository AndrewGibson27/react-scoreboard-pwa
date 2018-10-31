/* eslint-disable react/prop-types */

import React from 'react';

export default ({
  homeTeam: { name: homeName, winner: homeWinner },
  awayTeam: { name: awayName, winner: awayWinner },
  homeScore,
  awayScore,
}) => (
  <table>
    <tbody>
      <tr>
        <th>{homeName}</th>
        <th>{awayName}</th>
      </tr>
      <tr>
        <td>{homeScore} {homeWinner && <span>(w)</span>}</td>
        <td>{awayScore} {awayWinner && <span>(w)</span>}</td>
      </tr>
    </tbody>
  </table>
);
