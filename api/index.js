import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './models/User.js';
import GameModel from './models/Game.js';
import { isValidMove, playMove } from './gameLogic.js';

/**
 * @returns {string}
 */
function emptyBoardString() {
  let s = '';
  for (let i = 0; i < 15 * 15; i++) {
    s += ' ';
  }
  return s;
}

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/scrabble');

app.post('/register', (req, res) => {
  UserModel.create(req.body);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({
            status: 'success',
            name: user.name,
            email: user.email,
          });
        } else {
          res.json({
            status: 'fail',
            name: '',
            email: user.email,
          });
        }
      } else {
        res.json({
          status: 'fail',
          name: '',
          email: user.email,
        });
      }
    })
    .catch(err => res.json(err));
});

app.post('/newgame', (req, res) => {
  const { email1, email2 } = req.body;
  GameModel.create({
    email1: email1,
    email2: email2,
    rack1: '',
    rack2: '',
    score1: 0,
    score2: 0,
    board: emptyBoardString(),
    bag: '',
    player1Turn: true,
  });
});

app.get('/games', async (req, res) => {
  const { email } = req.query;

  try {
    const games = await GameModel.find({
      $or: [{ email1: email }, { email2: email }],
    });

    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/game/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await GameModel.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/game/move/:id', async (req, res) => {
  const { move } = req.body;
  const gameId = req.params.id;

  try {
    const game = await GameModel.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    if (!isValidMove(game, move)) {
      res.json({ status: 'fail', game: game });
    }
    const updatedGame = playMove(gameId, move);
    res.json({ status: 'success', game: updatedGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log('running server');
});