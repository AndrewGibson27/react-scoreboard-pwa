/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import getScoreDetail from '../../../store/score-detail/actions';
import WithLoaderAndError from '../../../wrappers/WithLoaderAndError';
import Game from '../components/Game';

const mapStateToProps = ({ scoreDetail }) => ({ scoreDetail });

const mapDispatchToProps = dispatch => ({
  getScoreDetail: (id) => { dispatch(getScoreDetail(id)); },
});

class Detail extends Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.getScoreDetail(id);
  }

  render() {
    return (
      <WithLoaderAndError
        content={this.props.scoreDetail}
        render={game => <Game game={game} />}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
