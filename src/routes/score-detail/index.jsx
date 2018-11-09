/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Detail from './containers/Detail';
import withClientFetch from '../../hoc/withClientFetch';
import getScoreDetail from '../../store/score-detail/actions';

const mapDispatchToProps = dispatch => ({
  getScoreDetail: (id) => { dispatch(getScoreDetail(id)); },
});

class ScoreDetail extends Component {
  getData() {
    const { match: { params: { id } } } = this.props;
    this.props.getScoreDetail(id);
  }

  render() {
    return (
      <section>
        <h2>And this is the score detail!</h2>
        <Detail match={this.props.match} />
      </section>
    );
  }
}

const ScoreDetailWithClientFetch = withClientFetch(ScoreDetail);

export default connect(null, mapDispatchToProps)(ScoreDetailWithClientFetch);
