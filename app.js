const express = require('express');
const { notesRouter } = require('./controllers/notes');
const { errorHandler, unknownEndpoint } = require('./utils/middlewares');

const app = express();

/** static **/
app.use(express.static('build'));

app.use(express.json());

/** routes **/
app.use('/api/notes', notesRouter);

/** handlers **/
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;