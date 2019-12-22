const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const middleware = require('./middleware');

router.post('/register', async (req, res) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await Users.insert(req.body);
  res.json(result);
});

router.post('/login', async (req, res) => {
  const user = await Users.getByEmail(req.body.email)
  if (user === undefined) {
    res.json({
      error: 'Error, email or password not found'
    })
  } else {
    const equals = bcrypt.compareSync(req.body.password, user.password);
    if (!equals) {
      res.json({
        error: 'Error, email or password not found'
      });
    } else {
      res.json({
        succesfull: createToken(user),
        done: 'Login correct'
      });
    }
  }
});

router.use(middleware.checkToken);

router.get('/mainUser', (req, res) => {
  Users.getById(req.userId)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => console.log(err));
});


router.get('/', async (req, res) => {
  const users = await Users.getAll();
  res.json(users);
});

const createToken = (user) => {
  let payload = {
    userId: user.id,
    createdAt: moment().unix(),
    expiresAt: moment().add(1, 'day').unix()
  }
  return jwt.encode(payload, process.env.TOKEN_KEY);
};


module.exports = router;