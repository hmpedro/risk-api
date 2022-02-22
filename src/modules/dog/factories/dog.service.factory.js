const DogService = require('../dog.service');
const { dogRepositoryFactory } = require('./dog.repository.factory');

const dogRepository = dogRepositoryFactory();

exports.dogServiceFactory = () => new DogService(dogRepository);
