/**
 * @typedef RiskService
 */
class RiskService {
  /**
   * @name analyse
   * @return {{auto: string, disability: string, life: string, home: string}}
   */
  analyse({
    age, dependents, house, income, maritalStatus, riskQuestions, vehicle,
  }) {
    const baseScore = riskQuestions.reduce((sum, currentVal) => sum + currentVal, 0);
    return {
      auto: 'regular',
      disability: 'ineligible',
      home: 'economic',
      life: 'regular',
    };
  }
}

module.exports = RiskService;
