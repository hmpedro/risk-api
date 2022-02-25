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
      auto: this.calculateAutoInsurance(baseScore, vehicle, age, income),
      disability: this.calculateDisabilityInsurance(baseScore, income, age, house, dependents, maritalStatus),
      home: this.calculateHomeInsurance(baseScore, house, age, income),
      life: this.calculateLifeInsurance(baseScore, income, age, dependents, maritalStatus),
    };
  }

  calculateAutoInsurance(baseScore, vehicle, age, income) {
    let autoScore = 0 + baseScore;

    if (!vehicle) {
      return 'ineligible';
    }

    const actualYear = (new Date(Date.now())).getFullYear();
    if ((actualYear - vehicle.year) <= 5) {
      autoScore += 1;
    }

    if (age < 30) {
      autoScore -= 2;
    } else if (age >= 30 && age < 40) {
      autoScore -= 1;
    }

    if (income > 200000) {
      autoScore -= 1;
    }

    return autoScore;
  }

  calculateDisabilityInsurance(baseScore, income, age, house, dependents, maritalStatus) {
    let disabilityScore = 0 + baseScore;

    if (income === 0 || age > 60) {
      return 'ineligible';
    }

    if (house.ownershipStatus === 'mortgaged') {
      disabilityScore += 1;
    }

    if (dependents > 0) {
      disabilityScore += 1;
    }

    if (maritalStatus === 'married') {
      disabilityScore -= 1;
    }

    if (age < 30) {
      disabilityScore -= 2;
    } else if (age >= 30 && age < 40) {
      disabilityScore -= 1;
    }

    if (income > 200000) {
      disabilityScore -= 1;
    }

    return disabilityScore;
  }

  calculateHomeInsurance(baseScore, house, age, income) {
    let homeScore = 0 + baseScore;

    if (!house) {
      return 'ineligible';
    }

    if (house.ownershipStatus === 'mortgaged') {
      homeScore += 1;
    }

    if (age < 30) {
      homeScore -= 2;
    } else if (age >= 30 && age < 40) {
      homeScore -= 1;
    }

    if (income > 200000) {
      homeScore -= 1;
    }

    return homeScore;
  }

  calculateLifeInsurance(baseScore, income, age, dependents, maritalStatus) {
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

    if (age < 30) {
      lifeScore -= 2;
    } if (age >= 30 && age < 40) {
      lifeScore -= 1;
    }

    if (income > 200000) {
      lifeScore -= 1;
    }

    return lifeScore;
  }
}

module.exports = RiskService;
