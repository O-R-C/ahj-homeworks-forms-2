import styles from './Button.module.css'

export default class Button {
  #params

  /**
   * @typedef {object} element
   * @property {String|String[]} classes
   * @property {String} type
   * @property {String} id
   * @property {String} title
   */

  /**
   * @param {element} element
   * {
   * classes = [styles.button],
   * id = '',
   * type = 'button',
   * title = 'button',
   * }
   */
  constructor(element) {
    this.#params = {
      ...this.#getDefaultParams(),
      ...element,
    }
  }

  #getDefaultParams() {
    return { classes: [], id: '', type: 'button', title: 'button' }
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]
    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.button],
    )
  }

  /**
   * @returns элемент
   */
  get element() {
    return this.#createElement()
  }

  #createElement() {
    const element = document.createElement('button')

    element.type = this.#params.type
    element.textContent = this.#params.title
    element.classList.add(...this.#getClasses(this.#params.classes))

    this.#params.id && (element.id = this.#params.id)

    return element
  }
}
