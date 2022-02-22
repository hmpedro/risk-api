const express = require('express');
const HealthController = require('./health.controller');
const { expressRouteAdapter } = require('../../middlewares/express.route.adapter');

const healthController = new HealthController();

const router = express.Router();

router.get('/', expressRouteAdapter({ routeHandler: healthController.check }));

module.exports = router;
