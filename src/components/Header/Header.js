import Div from '../ui/Div/Div'
import Button from '../ui/Button/Button'

import styles from './Header.module.css'

export default class Header {
  #classes

  /**
   *
   * @param {String|String[]} classes
   */
  constructor(classes) {
    this.#classes = classes
  }

  /**
   * @returns элемент
   */
  get element() {
    return this.#createElement()
  }

  #createElement() {
    const header = new Div({ classes: this.#getClasses(this.#classes) }).element
    const title = new Div({ classes: styles.title, title: 'Товары' }).element

    const btn = new Button({ classes: styles.btnAdd, title: '' }).element

    header.append(title, btn)

    return header
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.header],
    )
  }
}
