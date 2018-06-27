/* eslint-disable no-underscore-dangle, no-param-reassign */

import Team from '../db/team';
import Game from '../db/game';
import {
  getAndFormatGame,
  prepareTeamsforGameMutation,
  prepareFieldsForGameMutation,
} from './utils';

const resolvers = {
  Mutation: {
    createTeam(_, { input }) {
      const team = new Team(input);
      return team.save();
    },

    updateGame(_, { input, _id }) {
      const teams = prepareTeamsforGameMutation(input);
      const fields = { ...input, ...teams };

      return Game.findOneAndUpdate(
        { _id },
        { $set: fields },
      ).then(({ _id: gameId }) => (
        getAndFormatGame({ _id: gameId })
      ));
    },

    createGame(_, { input }) {
      const fields = prepareFieldsForGameMutation(input);
      const game = new Game(fields);

      return game.save().then(({ _id }) => getAndFormatGame(_id));
    },
  },
};

export default resolvers;
