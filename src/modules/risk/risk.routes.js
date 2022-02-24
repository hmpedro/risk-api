const express = require('express');
const { riskControllerFactory } = require('./factories/risk.controller.factory');
const { expressRouteAdapter } = require('../../middlewares/express.route.adapter');

const riskController = riskControllerFactory();

const router = express.Router();

router.post('/', expressRouteAdapter({ routeHandler: riskController.analyse }));

module.exports = router;
