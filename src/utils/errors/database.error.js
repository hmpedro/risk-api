const CoreError = require('./internal-server.error');

class DatabaseError extends CoreError {
  constructor({ message, rawError = '' }) {
    super({ message, rawError });
    this.name = 'DatabaseError';
  }
}

module.exports = DatabaseError;
