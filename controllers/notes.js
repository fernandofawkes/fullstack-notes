const notesRouter = require('express').Router();

let notes = [
  {id: 1, content: 'first note'}
];

notesRouter.get('/', (req, response) => {
    response.json(notes);
});

module.exports = {notesRouter};