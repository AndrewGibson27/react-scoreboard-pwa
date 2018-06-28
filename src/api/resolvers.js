/* eslint-disable no-underscore-dangle, no-param-reassign */

import Team from '../db/team';
import Game from '../db/game';
import { getAndFormatGame, prepareFieldsForGameMutation } from './utils';

const resolvers = {
  Mutation: {
    createTeam(_, { input }) {
      return new Team(input).save();
    },

    updateTeam(_, { input }) {
      const { _id, ...updates } = input;
      return Team.findOneAndUpdate(
        { _id },
        { $set: updates },
        { new: true },
      );
    },

    createGame(_, { input }) {
      const fields = prepareFieldsForGameMutation(input);
      const game = new Game(fields);

      return game.save().then(({ _id }) => getAndFormatGame(_id));
    },

    updateGame(_, { input }) {
      const {
        _id,
        awayTeam,
        homeTeam,
        ...updates
      } = input;

      if (homeTeam) {
        const { info, winner } = homeTeam;
        if (info) updates['homeTeam.info'] = info;
        if (typeof winner !== 'undefined') updates['homeTeam.winner'] = winner;
      }

      if (awayTeam) {
        const { info, winner } = awayTeam;
        if (info) updates['awayTeam.info'] = info;
        if (typeof winner !== 'undefined') updates['awayTeam.winner'] = winner;
      }

      return Game.findOneAndUpdate(
        { _id },
        { $set: updates },
      ).then(({ _id: gameId }) => (
        getAndFormatGame(gameId)
      ));
    },
  },
};

export default resolvers;
