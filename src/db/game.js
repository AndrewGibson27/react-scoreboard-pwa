import mongoose from 'mongoose';

const { Schema } = mongoose;

const gameSchema = Schema({
  homeTeam: {
    info: { type: Schema.Types.ObjectId, ref: 'Team' },
    winner: Boolean,
  },
  awayTeam: {
    info: { type: Schema.Types.ObjectId, ref: 'Team' },
    winner: Boolean,
  },
  homeScore: Number,
  awayScore: Number,
  period: Number,
  isInProgress: Boolean,
  isFinal: Boolean,
  location: String,
  date: String,
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
