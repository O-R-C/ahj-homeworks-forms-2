import styles from './Input.module.css'

export default class Input {
  #params

  /**
   * @typedef {object} element
   * @property {String|String[]} classes
   * @property {String} type
   * @property {String} id
   * @property {String} placeholder
   * @property {boolean} required
   */

  /**
   * @param {element} element
   * {
   * classes = [styles.input],
   * id = '',
   * name = '',
   * type = 'text',
   * required = true,
   * placeholder = '...'
   * }
   */
  constructor(element) {
    this.#params = {
      ...this.#getDefaultParams(),
      ...element,
    }
  }

  #getDefaultParams() {
    return {
      classes: [],
      id: '',
      type: 'text',
      required: true,
      placeholder: '...',
    }
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.input],
    )
  }

  /**
   * @returns элемент
   */
  get element() {
    return this.#createElement()
  }

  #createElement() {
    const element = document.createElement('input')

    element.type = this.#params.type
    element.required = this.#params.required
    element.placeholder = this.#params.placeholder
    element.classList.add(...this.#getClasses(this.#params.classes))

    this.#params.id && (element.id = this.#params.id)
    this.#params.name && (element.name = this.#params.name)

    return element
  }
}
