const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler.middleware');

class AppController {
  constructor() {
    this.express = express();
    this.initDbConnection();
    this.initCacheConnection();
    this.middlewares();
    this.routes();

    this.express.use(express.static('public'));
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    // TODO: Configure helmet for your needs.
    this.express.use(helmet({ contentSecurityPolicy: false }));
    this.express.use(compression());
  }

  routes() {
    this.express.use(routes);
    this.express.use(errorHandler);
  }

  static async initDbConnection() {
    console.log('Initiate the connection with your database, like Postgres, MySQL, etc.');
    return Promise.resolve();
  }

  static async initCacheConnection() {
    console.log('Initiate the connection with your caching tool, like Redis.');
    return Promise.resolve();
  }
}

module.exports = new AppController().express;
