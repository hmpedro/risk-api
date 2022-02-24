const RiskService = require('../risk.service');

exports.riskServiceFactory = () => new RiskService();
