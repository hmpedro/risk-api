const CoreError = require('./internal-server.error');

class ApiIntegrationError extends CoreError {
  constructor({
    message, description, platform, rawError = '',
  }) {
    super({ message, rawError });
    this.description = description;
    this.name = 'ApiIntegrationError';
    this.platform = platform;
  }
}

module.exports = ApiIntegrationError;
