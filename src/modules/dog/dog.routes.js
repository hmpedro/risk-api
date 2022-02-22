const express = require('express');
const { dogControllerFactory } = require('./factories/dog.controller.factory');
const { expressRouteAdapter } = require('../../middlewares/express.route.adapter');

const dogController = dogControllerFactory();

const router = express.Router();

router.get('/', expressRouteAdapter({ routeHandler: dogController.retrieve }));
router.get('/:dogId', expressRouteAdapter({ routeHandler: dogController.retrieveById }));
router.post('/', expressRouteAdapter({ routeHandler: dogController.create }));
router.put('/:dogId', expressRouteAdapter({ routeHandler: dogController.update }));
router.delete('/:dogId', expressRouteAdapter({ routeHandler: dogController.delete }));

module.exports = router;
