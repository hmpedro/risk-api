/**
 * @typedef Dog
 */
class Dog {
  /**
   * @param { string } name
   * @param { Array<string> } colors
   * @param { string } breed
   */
  constructor(name, colors, breed) {
    this.name = name;
    this.colors = colors;
    this.breed = breed;
  }
}

module.exports = Dog;
