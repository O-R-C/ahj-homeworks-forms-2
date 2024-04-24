import Div from '../ui/Div/Div'

import styles from './Row.module.css'

export default class Row {
  #classes
  #dataID

  /**
   *
   * @param {String|String[]} classes
   */
  constructor(classes, dataID) {
    this.#classes = classes
    this.#dataID = dataID ?? null
  }

  /**
   * @returns элемент
   */
  get element() {
    return this.#createElement()
  }

  #createElement() {
    const row = new Div({ classes: this.#getClasses(this.#classes), data: { id: this.#dataID } }).element

    return row
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.row],
    )
  }
}
