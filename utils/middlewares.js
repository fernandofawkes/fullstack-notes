const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'unknown id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const authorizationHandler = (request, response, next) => {
  const authHeader = request.get('authorization');
  if(authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    const decoded = jwt.verify(authHeader.substring(7), config.JWT_SECRET);
    if(!decoded.id) {
      return response.status(401).json({error: "invalid authorization token"});
    }
  } else {
    return response.status(401).json({error: "missing authorization token"});
  }

  next();
} 

module.exports = { unknownEndpoint, errorHandler, authorizationHandler };