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
    if (baseScore === 0 && income < 25000) {
      return {
        auto: 'ineligible',
        disability: 'ineligible',
        home: 'ineligible',
        life: 'ineligible',
        umbrella: 'ineligible',
      };
    }

    const autoInsurance = this.evaluateAutoInsurance(baseScore, vehicle, age, income);
    // eslint-disable-next-line max-len
    const disabilityInsurance = this.evaluateDisabilityInsurance(baseScore, income, age, house, dependents, maritalStatus, riskQuestions[1]);
    const homeInsurance = this.evaluateHomeInsurance(baseScore, house, age, income);
    const lifeInsurance = this.evaluateLifeInsurance(baseScore, income, age, dependents, maritalStatus);
    // eslint-disable-next-line max-len
    const umbrellaInsurance = this.evaluateUmbrellaInsurance(baseScore, autoInsurance, disabilityInsurance, homeInsurance, lifeInsurance, age, income);

    return {
      auto: autoInsurance,
      // eslint-disable-next-line max-len
      disability: disabilityInsurance,
      home: homeInsurance,
      life: lifeInsurance,
      umbrella: umbrellaInsurance,
    };
  }

  evaluateUmbrellaInsurance(baseScore, autoInsurance, disabilityInsurance, homeInsurance, lifeInsurance, age, income) {
    if (![autoInsurance, disabilityInsurance, homeInsurance, lifeInsurance].includes('economic')) {
      return 'ineligible';
    }

    let umbrellaScore = 0 + baseScore;
    umbrellaScore += this.basicRiskCalculation(age, income);

    return this.evaluateScoreResponse(umbrellaScore);
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

  evaluateDisabilityInsurance(baseScore, income, age, house, dependents, maritalStatus, secondRiskAnswer) {
    let disabilityScore = 0 + baseScore;

    if (income === 0 || age > 60) {
      return 'ineligible';
    }

    if (secondRiskAnswer) {
      disabilityScore += 2;
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
