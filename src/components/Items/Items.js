import Div from '../ui/Div/Div'
import Titles from '../Titles/Titles'

import styles from './Items.module.css'

export default class Items {
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
    const items = new Div({
      classes: [...this.#getClasses(this.#classes), 'wrapper'],
    }).element
    const titles = new Titles(styles.titles).element
    const itemsContainer = new Div({ classes: styles.itemsList }).element

    items.append(titles, itemsContainer)

    return items
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.items],
    )
  }
}
