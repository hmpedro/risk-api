const { constants: httpConstants } = require('http2');

/**
 * @typedef HealthController
 */
class HealthController {
  /**
   * @constructor
   * @param { { name: string, provider: string, serviceInstance: { healthCheck: function } } } coreServices
   */
  constructor(coreServices) {
    this.coreServices = coreServices;
    this.check = this.check.bind(this);
  }

  async check() {
    const runningServices = [];
    const notRunningServices = [];

    for (let i = 0; i < this.coreServices.length; i += 1) {
      const { name, provider, serviceInstance } = this.coreServices[i];

      try {
        // eslint-disable-next-line no-await-in-loop
        const metricResult = await serviceInstance.healthCheck();
        runningServices.push({ name, provider, condition: metricResult });
      } catch (e) {
        notRunningServices.push({ name, provider, condition: { health: false, cause: e.message } });
      }
    }

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        applicationStatus: 'running',
        runningServices,
        notRunningServices,
      },
    };
  }
}

module.exports = HealthController;
