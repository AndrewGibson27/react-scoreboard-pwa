/* eslint-disable no-underscore-dangle, no-param-reassign */

import Game from '../db/game';

export function getAndFormatGame(_id) {
  return Game.findOne({ _id })
    .populate('homeTeam.info awayTeam.info')
    .lean()
    .exec()
    .then((populatedGame) => {
      const { homeTeam: popHome, awayTeam: popAway } = populatedGame;
      const { info: homeInfo, winner: homeWinner } = popHome;
      const { info: awayInfo, winner: awayWinner } = popAway;

      populatedGame.homeTeam = {
        _id: homeInfo._id,
        name: homeInfo.name,
        winner: homeWinner,
      };
      populatedGame.awayTeam = {
        _id: awayInfo._id,
        name: awayInfo.name,
        winner: awayWinner,
      };

      return populatedGame;
    });
}

export function prepareTeamsforGameMutation(input) {
  const { homeTeam, awayTeam } = input;

  const formattedHomeTeam = {
    info: homeTeam.info,
    winner: homeTeam.winner || false,
  };

  const formattedAwayTeam = {
    info: awayTeam.info,
    winner: awayTeam.winner || false,
  };

  return {
    homeTeam: formattedHomeTeam,
    awayTeam: formattedAwayTeam,
  };
}

export function prepareFieldsForGameMutation(input) {
  const {
    location,
    homeScore = 0,
    awayScore = 0,
    period = 1,
    isInProgress = false,
    isFinal = false,
    date = new Date(),
  } = input;

  const teams = prepareTeamsforGameMutation(input);

  return {
    ...teams,
    location,
    homeScore,
    awayScore,
    period,
    isInProgress,
    isFinal,
    date,
  };
}
