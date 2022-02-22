const httpConstants = require('http2').constants;

class AuthorizationError extends Error {
  constructor({ message }) {
    super(message);
    this.name = 'AuthorizationError';
    this.status = httpConstants.HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = AuthorizationError;
