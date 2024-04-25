import FormItem from '../FormItem/FormItem'

import styles from './Modal.module.css'

export default class Modal {
  #classes

  /**
   *
   * @param {String|String[]} classes
   */
  constructor(classes) {
    this.#classes = this.#getClasses(classes)
  }

  /**
   * @returns элемент
   */
  get element() {
    return this.#createElement()
  }

  #createElement() {
    const modal = document.createElement('dialog')
    modal.classList.add(...this.#classes, 'wrapper')
    const form = new FormItem(styles.form).element

    modal.append(form)

    return modal
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.modal],
    )
  }
}
