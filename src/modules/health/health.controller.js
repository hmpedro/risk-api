const { constants: httpConstants } = require('http2');

class HealthController {
  constructor() {
    this.check = this.check.bind(this);
  }

  async check() {
    const runningServices = [];
    const notRunningServices = [];

    /**
		 * TODO: Add your external and internal services that your application depends to work.
		 * Every dependency should be wrapped in a local implementation and have it's own health check function.
		 *
		 */

    const coreMetrics = [
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

    for (let i = 0; i < coreMetrics.length; i += 1) {
      const { name, provider, serviceInstance } = coreMetrics[i];

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
