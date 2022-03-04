const Ajv = require('ajv');
const RiskController = require('../risk.controller');
const { riskServiceFactory } = require('./risk.service.factory');

const riskService = riskServiceFactory();
const ajv = new Ajv({ coerceTypes: true });

const analyzeSchema = {
  type: 'object',
  properties: {
    age: {
      type: 'integer',
      minimum: 0,
    },
    dependents: {
      type: 'integer',
      minimum: 0,
    },
    houses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          ownership_status: {
            type: 'string',
          },
        },
      },
    },
    income: {
      type: 'integer',
      minimum: 0,
    },
    marital_status: {
      type: 'string',
      enum: ['single', 'married'],
    },
    risk_questions: {
      type: 'array',
      items: {
        type: 'boolean',
      },
      maxItems: 3,
      minItems: 3,
    },
    vehicles: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          year: {
            type: 'integer',
            maximum: new Date(Date.now()).getFullYear() + 1,
          },
        },
      },
    },
  },
  required: [
    'age',
    'dependents',
    'income',
    'marital_status',
    'risk_questions',
  ],
};

const validators = {
  analyzeInputs: ajv.compile(analyzeSchema),
};

exports.riskControllerFactory = () => new RiskController(riskService, validators);
