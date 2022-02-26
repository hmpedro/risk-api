const { Router } = require('express');
const riskRouter = require('../modules/risk/risk.routes');

const router = Router();

router.use('/risk', riskRouter);

module.exports = router;
