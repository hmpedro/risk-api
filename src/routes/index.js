const { Router } = require('express');
const riskRouter = require('../modules/risk/risk.routes');
const healthRouter = require('../modules/health/health.routes');

const router = Router();

router.use('/risk', riskRouter);
router.use('/health', healthRouter);

module.exports = router;
