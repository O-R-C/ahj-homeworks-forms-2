import Div from '../ui/Div/Div'
import Row from '../Row/Row'

import styles from './Titles.module.css'

export default class Titles {
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
    const titles = new Row(this.#getClasses(this.#classes)).element
    const titleName = new Div({ title: 'Название' }).element
    const titlePrice = new Div({ title: 'Стоимость' }).element
    const titleActions = new Div({ title: 'Действия' }).element

    titles.append(titleName, titlePrice, titleActions)

    return titles
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.titles],
    )
  }
}
