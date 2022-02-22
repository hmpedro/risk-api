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

  async retrieveById({ params }) {
    const { dogId } = params;

    const valid = this.dogInputValidators.retrieveById(params);

    if (!valid) {
      throw new InvalidFormatError({ message: this.dogInputValidators.retrieveById.errors });
    }

    const dog = await this.dogService.retrieveById(dogId);

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

  async update({ params, body }) {
    const { dogId } = params;
    const dogValues = { ...body };

    const valid = this.dogInputValidators.update({ dogId, ...dogValues });

    if (!valid) {
      throw new InvalidFormatError({ message: this.dogInputValidators.update.errors });
    }

    await this.dogService.update(dogId, dogValues);

    return {
      status: httpConstants.HTTP_STATUS_NO_CONTENT,
    };
  }

  async delete({ params }) {
    const { dogId } = params;

    const valid = this.dogInputValidators.retrieveById(params);

    if (!valid) {
      throw new InvalidFormatError({ message: this.dogInputValidators.retrieveById.errors });
    }

    await this.dogService.delete(dogId);

    return {
      status: httpConstants.HTTP_STATUS_NO_CONTENT,
    };
  }
}

module.exports = DogController;
