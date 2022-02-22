class InternalServerError extends Error {
  constructor({ message, rawError }) {
    super(message);
    this.rawError = rawError;
  }
}

module.exports = InternalServerError;
