const httpConstants = require('http2').constants;

class TooManyRequestsError extends Error {
  constructor({ message }) {
    super(message);
    this.name = 'TooManyRequestsError';
    this.status = httpConstants.HTTP_STATUS_TOO_MANY_REQUESTS;
  }
}

module.exports = TooManyRequestsError;
