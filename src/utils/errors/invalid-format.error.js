const httpConstants = require('http2').constants;

class InvalidFormatError extends Error {
  constructor({ message }) {
    super(message);
    this.name = 'InvalidFormatError';
    this.status = httpConstants.HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = InvalidFormatError;
