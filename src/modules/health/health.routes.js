const express = require('express');
const HealthController = require('./health.controller');
const { expressRouteAdapter } = require('../../middlewares/express.route.adapter');

/**
 * TODO: Add your external and internal services that your application depends to work.
 * Every dependency should be wrapped in a local implementation and have it's own health check function.
 */
const coreServices = [
  {
    name: 'database',
    provider: 'NodeJS-base',
    serviceInstance: {
      async healthCheck() {
        return Promise.resolve({ health: true });
      },
    },
  },
];

const healthController = new HealthController(coreServices);

const router = express.Router();

router.get('/', expressRouteAdapter({ routeHandler: healthController.check }));

module.exports = router;
