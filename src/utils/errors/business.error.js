const httpConstants = require('http2').constants;

class BusinessError extends Error {
  constructor({ message }) {
    super(message);
    this.name = 'BusinessError';
    this.message = message;
    this.status = httpConstants.HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = BusinessError;
