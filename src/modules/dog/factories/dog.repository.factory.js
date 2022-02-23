const DogRepository = require('../dog.repository');
// TODO: Use your favorite DB :)
const fakeDb = require('../../../infra/database/fakeDB');

exports.dogRepositoryFactory = () => new DogRepository(fakeDb);
