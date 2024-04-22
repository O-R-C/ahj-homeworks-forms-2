import styles from './Form.module.css'

export default class Form {
  #params

  /**
   * @typedef {object} element
   * @property {String|String[]} classes
   * @property {String} id
   * @property {String} name
   */

  /**
   * @param {element} element
   * {
   * classes = [styles.form],
   * id = '',
   * name = '',
   * }
   */
  constructor(element) {
    this.#params = {
      ...this.#getDefaultParams(),
      ...element,
    }
  }

  #getDefaultParams() {
    return { classes: [], id: '', name: '' }
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.form],
    )
  }

  /**
   * @returns элемент
   */
  get element() {
    return this.#createElement()
  }

  #createElement() {
    const element = document.createElement('form')

    element.classList.add(...this.#getClasses(this.#params.classes))

    this.#params.id && (element.id = this.#params.id)
    this.#params.name && (element.id = this.#params.name)

    return element
  }
}
