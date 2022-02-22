const AuthorizationError = require('./authorizarion.error');
const BusinessError = require('./business.error');
const ForbiddenError = require('./forbidden.error');
const InvalidFormatError = require('./invalid-format.error');
const NotFoundError = require('./not-found.error');
const RequiredPropertyError = require('./required-property.error');
const DatabaseError = require('./database.error');

module.exports = {
  AuthorizationError,
  BusinessError,
  ForbiddenError,
  InvalidFormatError,
  NotFoundError,
  DatabaseError,
  RequiredPropertyError,
};
