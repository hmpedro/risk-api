const { riskServiceFactory } = require('../../../../src/modules/risk/factories/risk.service.factory');

describe('RiskService tests', () => {
  let personData;
  const riskService = riskServiceFactory();

  beforeEach(() => {
    personData = {
      age: 35,
      dependents: 2,
      income: 50,
      maritalStatus: 'married',
      riskQuestions: [1, 1, 0],
      house: {
        ownershipStatus: 'owned',
      },
      vehicle: { year: 2018 },
    };
  });

  it('should return correct object properties after evaluating the score', () => {
    const insuranceAnalysis = riskService.analyze(personData);

    expect(insuranceAnalysis.auto).toBeDefined();
    expect(typeof insuranceAnalysis.auto).toBe('string');
    expect(insuranceAnalysis.home).toBeDefined();
    expect(typeof insuranceAnalysis.home).toBe('string');
    expect(insuranceAnalysis.disability).toBeDefined();
    expect(typeof insuranceAnalysis.disability).toBe('string');
    expect(insuranceAnalysis.life).toBeDefined();
    expect(typeof insuranceAnalysis.life).toBe('string');
  });

  it('should return correct evaluated insurance when ', () => {
    const insuranceAnalysis = riskService.analyze(personData);

    expect(insuranceAnalysis.auto).toBe('regular');
    expect(insuranceAnalysis.disability).toBe('regular');
    expect(insuranceAnalysis.home).toBe('regular');
    expect(insuranceAnalysis.life).toBe('responsible');
  });

  // eslint-disable-next-line max-len
  it('should return ineligible for disability, auto, and home insurance when doesnt have income, vehicles or houses respectively', () => {
    personData.income = 0;
    delete personData.vehicle;
    delete personData.house;

    const insuranceAnalysis = riskService.analyze(personData);

    expect(insuranceAnalysis.disability).toBe('ineligible');
    expect(insuranceAnalysis.auto).toBe('ineligible');
    expect(insuranceAnalysis.home).toBe('ineligible');
  });

  it('should return ineligible for disability, and lige insurance when user is over 60 years old', () => {
    personData.age = 61;

    const insuranceAnalysis = riskService.analyze(personData);

    expect(insuranceAnalysis.disability).toBe('ineligible');
    expect(insuranceAnalysis.life).toBe('ineligible');
  });

  it('should evaluate economic string when score is less then 1', () => {
    const evaluatedString = riskService.evaluateScoreResponse(0);

    expect(evaluatedString).toBe('economic');
  });

  it('should evaluate regular string when score is between 1 and 2, including 1 and 2', () => {
    const evaluatedString = riskService.evaluateScoreResponse(1);

    expect(evaluatedString).toBe('regular');
  });

  it('should evaluate responsible string when score is greater than 2', () => {
    const evaluatedString = riskService.evaluateScoreResponse(3);

    expect(evaluatedString).toBe('responsible');
  });

  it('should increase risk when house ownershipStatus is mortgaged ', () => {
    personData.riskQuestions = [1, 1, 1];
    personData.house.ownershipStatus = 'mortgaged';
    const insuranceAnalysis = riskService.analyze(personData);

    expect(insuranceAnalysis.home).toBe('responsible');
  });

  it('should return reduce 2 when age is less than 30 for basic risk calculation ', () => {
    const basicRiskResult = riskService.basicRiskCalculation(29, 1);

    expect(basicRiskResult).toBe(-2);
  });

  it('should return reduce 1 when age is between 30(including 30) and 40 for basic risk calculation ', () => {
    const basicRiskResult = riskService.basicRiskCalculation(30, 1);

    expect(basicRiskResult).toBe(-1);
  });

  it('should return reduce 1 when income is greater then 200,000', () => {
    const basicRiskResult = riskService.basicRiskCalculation(50, 200001);

    expect(basicRiskResult).toBe(-1);
  });
});
