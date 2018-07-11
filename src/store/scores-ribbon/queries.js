export default `
  query ScoresListQuery {
    allGames {
      _id,
      homeScore
      awayScore
      period
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
    }
  }
`;
