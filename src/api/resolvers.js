/* eslint-disable no-underscore-dangle, no-param-reassign */

import Team from '../db/team';
import Game from '../db/game';
import { prepareFieldsForGameMutation, formatGame } from './utils';

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

      return game.save().then(({ _id }) => (
        Game.findById(_id)
          .populate('homeTeam.info awayTeam.info')
          .lean()
          .exec()
          .then(savedGame => formatGame(savedGame))
      ));
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
        { new: true },
      )
        .populate('homeTeam.info awayTeam.info')
        .lean()
        .exec()
        .then(game => formatGame(game));
    },
  },

  Query: {
    allTeams(_, { start, limit }) {
      return Team
        .find()
        .skip(start || 0)
        .limit(limit || 100);
    },

    allGames(_, { start, limit }) {
      return Game
        .find()
        .skip(start || 0)
        .limit(limit || 100)
        .populate('homeTeam.info awayTeam.info')
        .lean()
        .exec()
        .then(games => (
          games.map(game => formatGame(game))
        ));
    },

    teamById(_, { _id }) {
      return Team.findById(_id);
    },

    gameById(_, { _id }) {
      return Game.findById(_id)
        .populate('homeTeam.info awayTeam.info')
        .lean()
        .exec()
        .then(game => formatGame(game));
    },
  },
};

export default resolvers;
