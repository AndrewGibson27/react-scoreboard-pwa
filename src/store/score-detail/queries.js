export default `
  query ScoreDetailQuery($id: ID!) {
    gameById(_id: $id) {
      homeTeam {
        _id,
        name,
        winner
      }
      awayTeam {
        _id,
        name,
        winner
      }
      location
      isFinal
      isInProgress
      homeScore
      awayScore
      period
    }
  }
`;
