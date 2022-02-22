const httpConstants = require('http2').constants;

class RequiredPropertyError extends Error {
  constructor({ message }) {
    super(message);
    this.name = 'RequiredPropertyError';
    this.status = httpConstants.HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = RequiredPropertyError;
