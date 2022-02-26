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

  it('should return correct evaluated insurance', () => {
    const insuranceAnalysis = riskService.analyze(personData);

    expect(insuranceAnalysis.auto).toBe('regular');
    expect(insuranceAnalysis.disability).toBe('regular');
    expect(insuranceAnalysis.home).toBe('regular');
    expect(insuranceAnalysis.life).toBe('responsible');
  });
});
