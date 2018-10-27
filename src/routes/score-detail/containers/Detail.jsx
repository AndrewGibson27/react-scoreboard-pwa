/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import getScoreDetail from '../../../store/score-detail/actions';
import WithLoaderAndError from '../../../wrappers/WithLoaderAndError';

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
        render={game => <p>{game.homeTeam.name}</p>}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
