/* eslint-disable no-underscore-dangle, no-param-reassign */

export function formatGame(game) {
  const { homeTeam: popHome, awayTeam: popAway } = game;
  const { info: homeInfo, winner: homeWinner } = popHome;
  const { info: awayInfo, winner: awayWinner } = popAway;

  game.homeTeam = {
    _id: homeInfo._id,
    name: homeInfo.name,
    winner: homeWinner,
  };

  game.awayTeam = {
    _id: awayInfo._id,
    name: awayInfo.name,
    winner: awayWinner,
  };

  return game;
}

export function prepareFieldsForGameMutation(input) {
  const {
    homeTeam,
    awayTeam,
    location,
    homeScore = 0,
    awayScore = 0,
    period = 1,
    isInProgress = false,
    isFinal = false,
    date = new Date(),
  } = input;

  return {
    homeTeam: {
      info: homeTeam.info,
      winner: homeTeam.winner || false,
    },
    awayTeam: {
      info: awayTeam.info,
      winner: awayTeam.winner || false,
    },
    location,
    homeScore,
    awayScore,
    period,
    isInProgress,
    isFinal,
    date,
  };
}
