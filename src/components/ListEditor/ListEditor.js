import ListEditorUI from './ListEditorUI'

export default class ListEditor {
  #ui
  #app
  #element

  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }

    this.#element = element
    this.#ui = new ListEditorUI()
    this.#app = this.#ui.app
  }

  init() {
    this.#bindToDom()
    this.#addListeners()
  }

  #bindToDom() {
    this.#element.append(this.#app)
  }

  #addListeners() {
    // this.#app.addEventListener('click', this.#onClick)
  }
}
