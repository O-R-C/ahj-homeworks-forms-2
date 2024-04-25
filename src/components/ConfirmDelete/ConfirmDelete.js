import Div from '../ui/Div/Div'
import Button from '../ui/Button/Button'

import styles from './ConfirmDelete.module.css'

export default class ConfirmDelete {
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
    const confirmDelete = document.createElement('dialog')
    confirmDelete.classList.add(...this.#classes, 'wrapper')

    const div = new Div().element

    const btnDelete = new Button({
      classes: styles.btnDelete,
      title: 'Удалить',
    }).element
    const btnCancel = new Button({
      classes: styles.btnCancel,
      title: 'Отмена',
    }).element

    div.append(btnDelete, btnCancel)
    confirmDelete.append(div)

    return confirmDelete
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.confirmDelete],
    )
  }
}
