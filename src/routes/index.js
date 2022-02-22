const { Router } = require('express');
const v1Router = require('./v1');
const healthRouter = require('../modules/health/health.routes');

const router = Router();

router.use('/v1', v1Router);
router.use('/health', healthRouter);

module.exports = router;
