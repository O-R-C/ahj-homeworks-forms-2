import ListEditorUI from './ListEditorUI'
import { data } from '../../js/data'
import Item from '../../js/Item'

export default class ListEditor {
  #ui
  #app
  #form
  #modal
  #items
  #btnAdd
  #btnSave
  #element
  #btnCancel
  #itemsList

  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }

    this.#element = element
    this.#ui = new ListEditorUI()
    this.#app = this.#ui.app
    this.#items = data.map((item) => new Item(item))
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
    this.#modal = this.#app.querySelector('[class*="modal"]')
    this.#form = this.#modal.querySelector('[class*="formItem"]')
    this.#btnAdd = this.#app.querySelector('[class*="btnAdd"]')
    this.#btnSave = this.#app.querySelector('[class*="btnSave"]')
    this.#btnCancel = this.#app.querySelector('[class*="btnCancel"]')
    this.#itemsList = this.#app.querySelector('[class*="itemsList"]')
  }

  #addListeners() {
    this.#form.addEventListener('submit', this.#onSubmit)
    this.#btnAdd.addEventListener('click', this.#onAddItem)
    this.#btnCancel.addEventListener('click', this.#onCancel)
    this.#modal.addEventListener('close', this.#onCloseForm)
  }

  #renderItems() {
    this.#items.forEach((item) => {
      this.#itemsList.append(this.#ui.getItem(item))
    })
  }

  #onAddItem = () => {
    this.#modal.showModal()
  }

  #onCancel = () => {
    this.#modal.close()
  }

  #onSubmit = (e) => {
    e.preventDefault()
    this.#items.push(
      new Item({
        name: this.#form.fieldName.value,
        price: this.#form.fieldPrice.value,
      }),
    )
  }

  #onCloseForm = (e) => {
    this.#resetFields()
  }

  #resetFields() {
    this.#form.fieldName.value = ''
    this.#form.fieldPrice.value = ''
  }
}
