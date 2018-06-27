/* eslint-disable no-underscore-dangle, no-param-reassign */

import Team from '../db/team';
import Game from '../db/game';

const resolvers = {
  Mutation: {
    createTeam(_, { input }) {
      const team = new Team(input);
      return team.save();
    },

    createGame(_, { input }) {
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

      const game = new Game({
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
      });

      return game.save().then(({ _id }) => (
        Game.findOne({ _id })
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
          })
      ));
    },
  },
};

export default resolvers;
