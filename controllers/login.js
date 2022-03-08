const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (req, response) => {
    const { username, password } = req.body;

    const user = await User.findOne({
      username
    });
    
    let isCorrectPassword = false;
    if(user !== null) {
      isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
    }
    return isCorrectPassword ?
              response.status(200).json({
                username: user.username,
                name: user.name,
                token: jwt.sign(
                  {username: user.username, id: user._id},
                  config.JWT_SECRET,
                  {expiresIn: "7d"}
                )
              }) : 
              response.status(401).json({
                error: 'wrong username or password'
              });
});

module.exports = { loginRouter };