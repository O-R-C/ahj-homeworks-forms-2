import { v4 as uuid4 } from 'uuid'

export default class Item {
  /**
   * @typedef {object} element
   * @property {String} name
   * @property {String} price
   */

  /**
   * @param {element} element
   * {
   * name,
   * price,
   * }
   */
  constructor({ name, price }) {
    this.name = name
    this.price = price
    this.id = uuid4()
  }
}
