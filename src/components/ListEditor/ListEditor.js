import ListEditorUI from './ListEditorUI'
import { data } from '../../js/data'
import Item from '../../js/Item'
import { clearPrice } from '../../js/clearPrice'
import { clearCustomMessage, isInvalid } from '../../js/isInvalid'

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
  #fieldName
  #fieldPrice

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

  /**
   * Ищем и добавляем элементы
   */
  #addElements() {
    this.#modal = this.#app.querySelector('[class*="modal"]')
    this.#form = this.#modal.querySelector('[class*="formItem"]')
    this.#btnAdd = this.#app.querySelector('[class*="btnAdd"]')
    this.#btnSave = this.#app.querySelector('[class*="btnSave"]')
    this.#btnCancel = this.#app.querySelector('[class*="btnCancel"]')
    this.#itemsList = this.#app.querySelector('[class*="itemsList"]')

    this.#fieldName = this.#form.name
    this.#fieldPrice = this.#form.price
  }

  /**
   * Назначаем прослушку событий
   */
  #addListeners() {
    this.#form.addEventListener('submit', this.#onSubmit)
    this.#btnAdd.addEventListener('click', this.#onAddItem)
    this.#btnCancel.addEventListener('click', this.#onCancel)
    this.#modal.addEventListener('close', this.#onCloseForm)
    this.#fieldName.addEventListener('input', this.#onInputName)
    this.#fieldPrice.addEventListener('input', this.#onInputPrice)
  }

  /**
   * Выводит список товаров из базы this.#items
   */
  #renderItems() {
    this.#clearItemsList()
    this.#items.forEach((item) => {
      this.#itemsList.append(this.#ui.getItem(item))
    })
  }

  #clearItemsList() {
    this.#itemsList.innerHTML = ''
  }

  #onAddItem = () => {
    this.#modal.showModal()
  }

  #onCancel = () => {
    this.#modal.close()
  }

  #onSubmit = (e) => {
    e.preventDefault()

    this.#fieldName.value = this.#fieldName.value.trim()

    const invalid = isInvalid([this.#fieldName, this.#fieldPrice])
    if (invalid) return

    this.#items.push(
      new Item({
        name: this.#fieldName.value,
        price: this.#fieldPrice.value,
      }),
    )
    this.#renderItems()
    this.#modal.close()
  }

  #onCloseForm = () => {
    this.#resetFields()
  }

  #resetFields() {
    this.#fieldName.value = ''
    this.#fieldPrice.value = ''
  }

  #onInputName = (e) => {
    clearCustomMessage(e.currentTarget)
  }

  #onInputPrice = (e) => {
    clearCustomMessage(e.currentTarget)
    const value = this.#fieldPrice.value
    this.#fieldPrice.value = clearPrice(value)
  }
}
