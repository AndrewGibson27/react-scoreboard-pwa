export default `
  query ScoresListQuery {
    allGames {
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
      homeScore
      awayScore
      period
    }
  }
`;
