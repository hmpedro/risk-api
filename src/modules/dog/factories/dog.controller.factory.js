const Ajv = require('ajv');
const DogController = require('../dog.controller');
const { dogServiceFactory } = require('./dog.service.factory');

const dogService = dogServiceFactory();
const ajv = new Ajv({ coerceTypes: true });

const retrieveFilterSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    colors: { type: 'array', items: { type: 'string' }, uniqueItems: true },
    breed: { type: 'string' },
    limit: { type: 'integer' },
    offset: { type: 'integer' },
  },
};

const retrieveByIdSchema = {
  type: 'object',
  properties: {
    dogId: { type: 'integer' },
  },
  required: ['dogId'],
};

const createSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    colors: { type: 'array', items: { type: 'string' }, uniqueItems: true },
    breed: { type: 'string' },
  },
  required: ['name', 'colors', 'breed'],
};

const updateSchema = {
  type: 'object',
  properties: {
    dogId: { type: 'integer' },
    name: { type: 'string' },
    colors: { type: 'array', items: { type: 'string' }, uniqueItems: true },
    breed: { type: 'string' },
  },
  required: ['dogId'],
};

// TODO: Extract those input schemas to specific file.
const validators = {
  retrieve: ajv.compile(retrieveFilterSchema),
  retrieveById: ajv.compile(retrieveByIdSchema),
  create: ajv.compile(createSchema),
  update: ajv.compile(updateSchema),
};

exports.dogControllerFactory = () => new DogController(dogService, validators);
