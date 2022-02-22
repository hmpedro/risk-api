const httpConstants = require('http2').constants;

class ForbiddenError extends Error {
  constructor({ message }) {
    super(message);
    this.name = 'ForbiddenError';
    this.status = httpConstants.HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
