import ListEditorUI from './ListEditorUI'
import { data } from '../../js/data'

export default class ListEditor {
  #ui
  #app
  #items
  #btnAdd
  #element
  #itemsList

  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }

    this.#element = element
    this.#ui = new ListEditorUI()
    this.#app = this.#ui.app
    this.#items = data
  }

  init() {
    this.#bindToDom()
    this.#addElements()
    this.#addListeners()
    this.#renderItems()
  }

  #bindToDom() {
    this.#element.append(this.#app)
  }
  #addElements() {
    this.#btnAdd = this.#app.querySelector('[class*="btnAdd"]')
    this.#itemsList = this.#app.querySelector('[class*="itemsList"]')
  }

  #addListeners() {
    // this.#app.addEventListener('click', this.#onClick)
  }

  #renderItems() {
    this.#items.forEach((item) => {
      this.#itemsList.append(this.#ui.getItem(item))
    })
  }
}
