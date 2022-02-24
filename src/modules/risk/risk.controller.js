const { constants: httpConstants } = require('http2');

/**
 * @typedef RiskController
 */
class RiskController {
  /**
   * @constructor
   * @param { RiskService } riskService
   * @param { { [string]: function } } riskInputValidators
   */
  constructor(riskService, riskInputValidators) {
    this.riskService = riskService;
    this.riskInputValidators = riskInputValidators;
  }

  /**
   * @name retrieve
   * @param { { } } body
   * @return { Promise<{ body: { auto, disability, home, life }, status: number }> }
   */
  async analyse({ body }) {
    const valid = this.riskInputValidators.analyse(body);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.riskInputValidators.analyse.errors,
        },
      };
    }

    const analyseResult = this.riskService.analyse(body);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        ...analyseResult,
      },
    };
  }
}

module.exports = RiskController;
