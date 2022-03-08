const express = require('express');
const mongoose = require("mongoose");
const config = require("./utils/config");
const { notesRouter } = require('./controllers/notes');
const { usersRouter } = require('./controllers/users');
const { errorHandler, unknownEndpoint } = require('./utils/middlewares');

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
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

/** handlers **/
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;