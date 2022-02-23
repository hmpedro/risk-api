const path = require('path');

require('dotenv').config({
  path: path.resolve(__filename, '../../../.env'),
});

class DatabaseEnvEnv {
  static get DATABASE_CONNECTION_URL() {
    return process.env.DATABASE_CONNECTION_URL || 'database.connection.url';
  }
}

module.exports = DatabaseEnvEnv;
