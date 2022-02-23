const Dog = require('./dog.model');

/**
 * @typedef DogService
 */
class DogService {
  /**
   * @constructor
   * @param { DogRepository } dogRepository
   */
  constructor(dogRepository) {
    this.dogRepository = dogRepository;
  }

  /**
   * @name retrieve
   * @param { {} } filterValues
   * @param { {} } pagination
   * @return { Promise<*> }
   */
  async retrieve({ filterValues, pagination }) {
    return this.dogRepository.retrieve({ filterValues, pagination });
  }

  /**
   * @name retrieveById
   * @param { number } dogId
   * @return { Promise<*> }
   */
  async retrieveById(dogId) {
    return this.dogRepository.retrieveById(dogId);
  }

  /**
   * @name create
   * @param { {} } dogValues
   * @return { Promise<*|undefined> }
   */
  async create(dogValues) {
    const dog = new Dog(...dogValues);

    return this.dogRepository.insert(dog);
  }

  /**
   * @name update
   * @param { number } dogId
   * @param { {} } dogValues
   * @return { Promise<*|undefined> }
   */
  async update(dogId, dogValues) {
    const dog = new Dog(...dogValues);

    return this.dogRepository.update(dogId, dog);
  }

  /**
   * @name delete
   * @param { number } dogId
   * @return { Promise<boolean> }
   */
  async delete(dogId) {
    return this.dogRepository.delete(dogId);
  }
}

module.exports = DogService;
