import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './models/User.js';
import GameModel from './models/Game.js';

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
    board: '',
    bag: '',
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

app.listen(3001, () => {
  console.log('running server');
});