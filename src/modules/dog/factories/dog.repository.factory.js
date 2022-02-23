const DogRepository = require('../dog.repository');

// TODO: Use your favorite DB :)
const fakeDbInstance = {
  async find({ filters, pagination }) {
    if (filters.id) {
      return Promise.resolve([
        {
          id: filters.id,
          name: 'dog1',
          colors: ['black'],
          breed: 'breed1',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ]);
    }

    return Promise.resolve([
      {
        id: Math.floor(Math.random() * 999),
        name: 'dog1',
        colors: ['black'],
        breed: 'breed1',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: Math.floor(Math.random() * 999),
        name: 'dog2',
        colors: ['white', 'brown'],
        breed: 'breed2',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);
  },
  async insert(obj) {
    return Promise.resolve({
      id: Math.floor(Math.random() * 999),
      ...obj,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
  async update(id, obj) {
    return Promise.resolve({
      id,
      ...obj,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
  async delete(id) {
    return Promise.resolve(!!id);
  },
};

exports.dogRepositoryFactory = () => new DogRepository(fakeDbInstance);
