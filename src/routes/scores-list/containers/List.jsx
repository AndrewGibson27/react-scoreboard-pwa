/* eslint-disable react/prop-types, jsx-a11y/anchor-is-valid */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = ({ scoresList: { data } }) => ({ data });

const List = ({ data, match: { url } }) => (
  <ul>
    {
      data.map(({
        _id,
        homeTeam,
        awayTeam,
      }) => (
        <li key={_id}>
          <Link
            to={`${url}${_id}`}
          >
            {awayTeam.name} vs. {homeTeam.name}
          </Link>
        </li>
      ))
    }
  </ul>
);

export default connect(mapStateToProps)(List);
