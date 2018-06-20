import mongoose from 'mongoose';

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

      return game.save();
    },
  },
};

export default resolvers;
