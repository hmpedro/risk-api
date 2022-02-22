const { DatabaseError } = require('../../utils/errors');

class DogRepository {
  constructor(dbInstance) {
    this.db = dbInstance;
  }

  async retrieve({ filterValues, pagination }) {
    try {
      return this.db.retrieve({ filterValues, pagination });
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  async retrieveById(dogId) {
    try {
      return this.db.retrieve({ id: dogId });
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  async insert(dog) {
    try {
      return this.db.insert(dog);
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  async update(dogId, dog) {
    try {
      return this.db.update(dogId, dog);
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  async delete(dogId) {
    try {
      return this.db.delete(dogId);
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }
}

module.exports = DogRepository;
