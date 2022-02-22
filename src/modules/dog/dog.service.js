const Dog = require('./dog.model');

class DogService {
  constructor(dogRepository) {
    this.dogRepository = dogRepository;
  }

  async retrieve(filters) {
    return this.dogRepository.retrieve(filters);
  }

  async retrieveById(dogId) {
    return this.dogRepository.retrieveById(dogId);
  }

  async create(dogValues) {
    const dog = new Dog(dogValues);

    return this.dogRepository.insert(dog);
  }

  async update(dogId, dogValues) {
    const dog = new Dog(dogValues);

    return this.dogRepository.update(dogId, dog);
  }

  async delete(dogId) {
    return this.dogRepository.delete(dogId);
  }
}

module.exports = DogService;
