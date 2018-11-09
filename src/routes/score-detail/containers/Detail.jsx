/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';

import WithLoaderAndError from '../../../wrappers/WithLoaderAndError';
import Game from '../components/Game';

const mapStateToProps = ({ scoreDetail }) => ({ scoreDetail });

const Detail = ({ scoreDetail }) => (
  <WithLoaderAndError
    content={scoreDetail}
    render={game => <Game game={game} />}
  />
);

export default connect(mapStateToProps)(Detail);
