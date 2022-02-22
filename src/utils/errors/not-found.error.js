const httpConstants = require('http2').constants;

class NotFoundError extends Error {
  constructor({ message }) {
    super(message);
    this.name = 'NotFoundError';
    this.status = httpConstants.HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
