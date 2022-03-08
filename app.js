const express = require('express');
const mongoose = require("mongoose");
const config = require("./utils/config");
const { notesRouter } = require('./controllers/notes');
const { usersRouter } = require('./controllers/users');
const { errorHandler, unknownEndpoint, authorizationHandler } = require('./utils/middlewares');
const { loginRouter } = require('./controllers/login');

const app = express();

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message);
  });

/** static **/
app.use(express.static('build'));

app.use(express.json());

/** routes **/
app.use('/api/notes', authorizationHandler, notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

/** handlers **/
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;