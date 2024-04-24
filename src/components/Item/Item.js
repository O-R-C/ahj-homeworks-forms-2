import Div from '../ui/Div/Div'
import Row from '../Row/Row'

import styles from './Item.module.css'
import Actions from '../Actions/Actions'

export default class Item {
  #params

  /**
   * @typedef {object} element
   * @property {String|String[]} classes
   * @property {String} name
   * @property {String} price
   */

  /**
   * @param {element} element
   * {
   * classes = [],
   * name = 'name',
   * price = 'price',
   * }
   */
  constructor(element) {
    this.#params = {
      ...this.#getDefaultParams(),
      ...element,
    }
  }

  #getDefaultParams() {
    return { classes: [], name: '', price: '' }
  }

  /**
   * @returns элемент
   */
  get element() {
    return this.#createElement()
  }

  #createElement() {
    const item = new Row(this.#getClasses(this.#params.classes)).element
    const itemName = new Div({ title: this.#params.name }).element
    const itemPrice = new Div({ title: this.#params.price }).element
    const itemActions = new Actions().element

    item.append(itemName, itemPrice, itemActions)

    return item
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.item],
    )
  }
}
