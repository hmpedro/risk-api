const path = require('path');

require('dotenv').config({
  path: path.resolve(__filename, '../../../.env'),
});

class AppEnv {
  static get NODE_ENV() {
    return process.env.NODE_ENV || 'development';
  }

  static get PORT() {
    return process.env.PORT || '3000';
  }
}

module.exports = AppEnv;
