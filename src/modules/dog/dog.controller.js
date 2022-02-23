const { constants: httpConstants } = require('http2');
const { InvalidFormatError } = require('../../utils/errors');

/**
 * @typedef DogController
 */
class DogController {
  /**
   * @constructor
   * @param { DogService} dogService
   * @param { { string: ValidateFunction } } dogInputValidators
   */
  constructor(dogService, dogInputValidators) {
    this.dogService = dogService;
    this.dogInputValidators = dogInputValidators;
  }

  /**
   * @name retrieve
   * @param { {} } query
   * @return { Promise<{ body: { dogs: Array<Dog> }, status: number }> }
   */
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

  /**
   * @name retrieveById
   * @param params
   * @return { Promise<{ body: { dog: Dog }, status: number }> }
   */
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

  /**
   * @name create
   * @param { {} } body
   * @return { Promise<{ body: { dog: Dog }, status: number }> }
   */
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

  /**
   * @name update
   * @param { { dogId: number } } params
   * @param { {} } body
   * @return { Promise<{ status: number }> }
   */
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

  /**
   * @name delete
   * @param { { dogId: number } } params
   * @return { Promise<{ status: number }> }
   */
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
