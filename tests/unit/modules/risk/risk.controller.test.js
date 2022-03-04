const { constants: httpConstants } = require('http2');
const { riskControllerFactory } = require('../../../../src/modules/risk/factories/risk.controller.factory');
const RiskService = require('../../../../src/modules/risk/risk.service');

describe('RiskController tests', () => {
  const riskController = riskControllerFactory();
  it('Should return object with response structure', () => {
    const request = {
      body: {
        age: 35,
        dependents: 2,
        houses: [
          { id: 1, ownership_status: 'owned' },
        ],
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 1, 0],
        vehicles: [
          { id: 1, year: 2019 },
          { id: 2, year: 2010 },
          { id: 3, year: 2012 },
        ],
      },
    };

    const response = riskController.analyze(request);

    expect(response).toBeDefined();
    expect(response.status).toBe(httpConstants.HTTP_STATUS_OK);
    expect(response.body).toBeDefined();
    expect(response.body.insuranceAnalysis).toBeDefined();
    expect(response.body.insuranceAnalysis.auto).toBeDefined();
    expect(Array.isArray(response.body.insuranceAnalysis.auto)).toBeTruthy();
    expect(response.body.insuranceAnalysis.disability).toBeDefined();
    expect(response.body.insuranceAnalysis.home).toBeDefined();
    expect(Array.isArray(response.body.insuranceAnalysis.home)).toBeTruthy();
    expect(response.body.insuranceAnalysis.life).toBeDefined();
    expect(response.body.insuranceAnalysis.umbrella).toBeDefined();
  });

  it('Should return bad request error when input is invalid', () => {
    const request = {
      body: {
        foo: 'bar',
      },
    };

    const response = riskController.analyze(request);

    expect(response).toBeDefined();
    expect(response.status).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);
    expect(response.body).toBeDefined();
    expect(response.body.errors).toBeDefined();
  });
});
