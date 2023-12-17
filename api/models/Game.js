import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  email1: String,
  email2: String,
  rack1: String,
  rack2: String,
  score1: Number,
  score2: Number,
  board: String,
  bag: String,
  player1Turn: Boolean,
});

const GameModel = mongoose.model('games', GameSchema);

export default GameModel;