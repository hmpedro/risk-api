const express = require('express');
const { riskControllerFactory } = require('./factories/risk.controller.factory');
const { expressRouteAdapter } = require('../../middlewares/express.route.adapter');

const riskController = riskControllerFactory();

const router = express.Router();

router.post('/analyze', expressRouteAdapter({ routeHandler: riskController.analyze }));

module.exports = router;
