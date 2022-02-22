const { DatabaseError } = require('../../utils/errors');

class DogRepository {
  constructor(dbInstance) {
    this.db = dbInstance;
  }

  async insert(dog) {
    try {
      return this.db.insert(dog);
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }
}

module.exports = DogRepository;
