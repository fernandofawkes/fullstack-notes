const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (req, response) => {
    const { username, name, password } = req.body;

    const exists = await User.findOne({
      username
    });

    if(exists) return response.status(400).json({error: 'username must be unique'});

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
  
    const user = new User({
      username,
      name,
      passwordHash
    });
  
    const savedUser = await user.save();
  
    response.status(201).json(savedUser);
});

module.exports = { usersRouter };