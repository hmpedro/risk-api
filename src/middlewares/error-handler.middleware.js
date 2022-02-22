const httpConstants = require('http2').constants;
const CoreError = require('../utils/errors/internal-server.error');

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  const defaultMessage = 'internal.server.error';

  console.error(`${new Date()} - [Server] Logging error:`);
  console.error(error);

  if (error instanceof CoreError) {
    res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
      message: defaultMessage,
    });
  } else {
    res.status(error.status || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
      message: error.message || defaultMessage,
    });
  }
};
