/**
 * @typedef FakeDB
 * @type { { getDbConnection: function, shutDownConnection: function, healthCheck: function }}
 */
module.exports = {
  /**
   * @return {Promise<{ find, findById, create, update, delete }>}
  */
  async getDbConnection() {
    return Promise.resolve({
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
    });
  },
  /**
   * @name shutDownConnection
   * @return { Promise<boolean> }
   */
  async shutDownConnection() {
    return Promise.resolve(true);
  },
  /**
   * @name healthCheck
   * @return { Promise<{ health: boolean }> }
   */
  async healthCheck() {
    return Promise.resolve({
      health: true,
    });
  },
};
