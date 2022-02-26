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

    this.analyze = this.analyze.bind(this);
  }

  /**
   * @name analyze
   * @param { { } } body
   * @return { Promise<{ body: { auto, disability, home, life }, status: number }> }
   */
  analyze({ body }) {
    const valid = this.riskInputValidators.analyzeInputs(body);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.riskInputValidators.analyzeInputs.errors,
        },
      };
    }

    const personData = {
      age: body.age,
      dependents: body.dependents,
      income: body.income,
      maritalStatus: body.marital_status,
      riskQuestions: body.risk_questions,
      house: body.house ? {
        ownershipStatus: body.house.ownership_status,
      } : null,
      vehicle: body.vehicle,
    };

    const analyseResult = this.riskService.analyze(personData);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        insuranceAnalysis: analyseResult,
      },
    };
  }
}

module.exports = RiskController;
