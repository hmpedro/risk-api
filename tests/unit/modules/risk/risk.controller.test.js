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
        income: 50,
        marital_status: 'married',
        risk_questions: [1, 1, 0],
        house: { ownership_status: 'owned' },
        vehicle: { year: 2018 },
      },
    };

    const response = riskController.analyze(request);

    expect(response).toBeDefined();
    expect(response.status).toBe(httpConstants.HTTP_STATUS_OK);
    expect(response.body).toBeDefined();
    expect(response.body.insuranceAnalysis).toBeDefined();
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
