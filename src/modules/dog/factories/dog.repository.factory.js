const DogRepository = require('../dog.repository');

// TODO: Use your favorite DB :)
const fakeDbInstance = {
  async insert(obj) {
    return Promise.resolve({
      id: Math.floor(Math.random() * 999),
      ...obj,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
};

exports.dogRepositoryFactory = () => new DogRepository(fakeDbInstance);
