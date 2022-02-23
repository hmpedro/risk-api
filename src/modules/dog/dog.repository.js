const { DatabaseError } = require('../../utils/errors');

/**
 * @typedef DogRepository
 */
class DogRepository {
  /**
   * @constructor
   * @param dbInstance
   */
  constructor(dbInstance) {
    this.db = dbInstance;
  }

  /**
   * @name retrieve
   * @param { {} } filterValues
   * @param { {} } pagination
   * @return { Promise<*> }
   */
  async retrieve(filterValues = {}, pagination = {}) {
    const queryPagination = {
      ...{ limit: 10, offset: 0 },
      ...pagination,
    };

    try {
      return this.db.find({ filters: filterValues, pagination: queryPagination });
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @name retrieveById
   * @param { number } dogId
   * @return { Promise<*> }
   */
  async retrieveById(dogId) {
    try {
      return this.db.find({ id: dogId });
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @name insert
   * @param { Dog } dog
   * @return {Promise<*|undefined|(*&{createdAt: number, id: number, updatedAt: number})>}
   */
  async insert(dog) {
    try {
      return this.db.insert(dog);
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @name update
   * @param { number } dogId
   * @param { Dog } dog
   * @return { Promise<*|undefined|(*&{createdAt: number, id: number, updatedAt: number})> }
   */
  async update(dogId, dog) {
    try {
      return this.db.update(dogId, dog);
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @name delete
   * @param dogId
   * @return {Promise<boolean>}
   */
  async delete(dogId) {
    try {
      return this.db.delete(dogId);
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }
}

module.exports = DogRepository;
