import styles from './Header.module.css'

export default class Header {
  #params

  /**
   * @typedef {object} element
   * @property {String|String[]} classes
   * @property {String} id
   * @property {String} type
   * @property {String} title
   */

  /**
   * @param {element} element
   * {
   * classes = [styles.header],
   * id = '',
   * type = 'h3',
   * title = 'Header',
   * }
   */
  constructor(element) {
    this.#params = {
      ...this.#getDefaultParams(),
      ...element,
    }
  }

  #getDefaultParams() {
    return { classes: [], id: '', title: 'Header 1', type: 'h3' }
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

  /**
   * @returns элемент
   */
  get element() {
    return this.#createElement()
  }

  #createElement() {
    const element = document.createElement(this.#params.type)

    element.textContent = this.#params.title
    element.classList.add(...this.#getClasses(this.#params.classes))

    this.#params.id && (element.id = this.#params.id)

    return element
  }
}
