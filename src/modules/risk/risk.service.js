/**
 * @typedef RiskService
 */
class RiskService {
  /**
   * @name analyze
   * @return {{auto: string, disability: string, life: string, home: string}}
   */
  analyze({
    age, dependents, house, income, maritalStatus, riskQuestions, vehicle,
  }) {
    const baseScore = riskQuestions.reduce((sum, currentVal) => sum + currentVal, 0);
    return {
      auto: this.evaluateAutoInsurance(baseScore, vehicle, age, income),
      // eslint-disable-next-line max-len
      disability: this.evaluateDisabilityInsurance(baseScore, income, age, house, dependents, maritalStatus),
      home: this.evaluateHomeInsurance(baseScore, house, age, income),
      life: this.evaluateLifeInsurance(baseScore, income, age, dependents, maritalStatus),
    };
  }

  evaluateAutoInsurance(baseScore, vehicle, age, income) {
    let autoScore = 0 + baseScore;

    if (!vehicle) {
      return 'ineligible';
    }

    const actualYear = (new Date(Date.now())).getFullYear();
    if ((actualYear - vehicle.year) <= 5) {
      autoScore += 1;
    }

    autoScore += this.basicRiskCalculation(age, income);

    return this.evaluateScoreResponse(autoScore);
  }

  evaluateDisabilityInsurance(baseScore, income, age, house, dependents, maritalStatus) {
    let disabilityScore = 0 + baseScore;

    if (income === 0 || age > 60) {
      return 'ineligible';
    }

    if (house?.ownershipStatus === 'mortgaged') {
      disabilityScore += 1;
    }

    if (dependents > 0) {
      disabilityScore += 1;
    }

    if (maritalStatus === 'married') {
      disabilityScore -= 1;
    }

    disabilityScore += this.basicRiskCalculation(age, income);

    return this.evaluateScoreResponse(disabilityScore);
  }

  evaluateHomeInsurance(baseScore, house, age, income) {
    let homeScore = 0 + baseScore;

    if (!house) {
      return 'ineligible';
    }

    if (house.ownershipStatus === 'mortgaged') {
      homeScore += 1;
    }

    homeScore += this.basicRiskCalculation(age, income);

    return this.evaluateScoreResponse(homeScore);
  }

  evaluateLifeInsurance(baseScore, income, age, dependents, maritalStatus) {
    let lifeScore = 0 + baseScore;

    if (age > 60) {
      return 'ineligible';
    }

    if (dependents > 0) {
      lifeScore += 1;
    }

    if (maritalStatus === 'married') {
      lifeScore += 1;
    }

    lifeScore += this.basicRiskCalculation(age, income);

    return this.evaluateScoreResponse(lifeScore);
  }

  basicRiskCalculation(age, income) {
    let score = 0;

    if (age < 30) {
      score -= 2;
    }
    if (age >= 30 && age < 40) {
      score -= 1;
    }

    if (income > 200000) {
      score -= 1;
    }

    return score;
  }

  evaluateScoreResponse(score) {
    if (score < 1) {
      return 'economic';
    }

    if (score >= 1 && score <= 2) {
      return 'regular';
    }

    return 'responsible';
  }
}

module.exports = RiskService;
