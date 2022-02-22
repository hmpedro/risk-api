const { constants: httpConstants } = require('http2');
const { InvalidFormatError } = require('../../utils/errors');

class DogController {
  constructor(dogService, dogInputValidators) {
    this.dogService = dogService;
    this.dogInputValidators = dogInputValidators;
  }

  async retrieve({ query }) {
    const valid = this.dogInputValidators.retrieve(query);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.dogInputValidators.retrieve.errors,
        },
      };
    }

    const dogs = await this.dogService.retrieve(query);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        dogs,
      },
    };
  }

  async retrieveById({ body }) {
    const dogValues = { ...body };

    const valid = this.dogInputValidators.create(dogValues);

    if (!valid) {
      throw new InvalidFormatError({ message: this.dogInputValidators.create.errors });
    }

    const dog = await this.dogService.create({ dogValues });

    return {
      status: httpConstants.HTTP_STATUS_CREATED,
      body: {
        dog,
      },
    };
  }

  async create({ body }) {
    const dogValues = { ...body };

    const valid = this.dogInputValidators.create(dogValues);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.dogInputValidators.create.errors,
        },
      };
    }

    const dog = await this.dogService.create(dogValues);

    return {
      status: httpConstants.HTTP_STATUS_CREATED,
      body: {
        dog,
      },
    };
  }

  async update({ body }) {
    const dogValues = { ...body };

    const valid = this.dogInputValidators.create(dogValues);

    if (!valid) {
      throw new InvalidFormatError({ message: this.dogInputValidators.create.errors });
    }

    const dog = await this.dogService.create({ dogValues });

    return {
      status: httpConstants.HTTP_STATUS_CREATED,
      body: {
        dog,
      },
    };
  }

  async delete({ body }) {
    const dogValues = { ...body };

    const valid = this.dogInputValidators.create(dogValues);

    if (!valid) {
      throw new InvalidFormatError({ message: this.dogInputValidators.create.errors });
    }

    const dog = await this.dogService.create({ dogValues });

    return {
      status: httpConstants.HTTP_STATUS_CREATED,
      body: {
        dog,
      },
    };
  }
}

module.exports = DogController;
