/* eslint-disable no-underscore-dangle, no-param-reassign */

import Team from '../db/team';
import Game from '../db/game';

const resolvers = {
  Mutation: {
    createTeam(_, { name }) {
      if (!name) throw new Error('No team name given');
      const team = new Team({ name });
      return team.save();
    },

    createGame(_, args) {
      const {
        homeTeam,
        awayTeam,
        location,
        homeTeamWon = false,
        awayTeamWon = false,
        homeScore = 0,
        awayScore = 0,
        period = 1,
        isInProgress = false,
        isFinal = false,
        date = new Date(),
      } = args;

      if (!homeTeam || !awayTeam || !location) {
        throw new Error('Missing required arguments for createGame');
      }

      const game = new Game({
        homeTeam: {
          info: homeTeam,
          winner: homeTeamWon,
        },
        awayTeam: {
          info: awayTeam,
          winner: awayTeamWon,
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
          .populate({ path: 'homeTeam.info' })
          .populate({ path: 'awayTeam.info' })
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
