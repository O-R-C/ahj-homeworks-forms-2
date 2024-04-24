import Button from '../ui/Button/Button'
import Div from '../ui/Div/Div'

import styles from './Actions.module.css'

export default class Actions {
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
    const actions = new Div({ classes: this.#getClasses(this.#classes) }).element
    const btnEdit = new Button({ classes: styles.btnEdit, title: '' }).element
    const btnDelete = new Button({ classes: styles.btnDelete, title: '' }).element

    actions.append(btnEdit, btnDelete)

    return actions
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.actions],
    )
  }
}
