import Item from '../../js/Item'
import ListEditorUI from './ListEditorUI'
import { data } from '../../js/data'
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
  #btnDelete
  #btnCancel
  #itemsList
  #fieldName
  #fieldPrice
  #modalConfirm
  #idToDelete

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
    this.#itemsList = this.#app.querySelector('[class*="itemsList"]')
    this.#btnCancel = this.#modal.querySelector('[class*="btnCancel"]')
    this.#modalConfirm = this.#app.querySelector('[class*="confirmDelete"]')

    this.#fieldName = this.#form.name
    this.#fieldPrice = this.#form.price
  }

  /**
   * Назначаем прослушку событий
   */
  #addListeners() {
    this.#form.addEventListener('submit', this.#onSubmit)
    this.#modal.addEventListener('click', this.#onClickForm)
    this.#modal.addEventListener('close', this.#onCloseForm)
    this.#btnAdd.addEventListener('click', this.#onAddItem)
    this.#btnCancel.addEventListener('click', this.#onCancel)
    this.#itemsList.addEventListener('click', this.#onDelete)
    this.#fieldName.addEventListener('input', this.#onInputName)
    this.#fieldPrice.addEventListener('input', this.#onInputPrice)
    this.#modalConfirm.addEventListener('click', this.#onClickConfirm)
    this.#modalConfirm.addEventListener('close', this.#onCloseConfirm)
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

  #onClickForm = (e) => {
    this.#closeModal(e.target, e.currentTarget)
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

  #onDelete = (e) => {
    const btnDelete = e.target.closest('[class*="btnDelete"]')
    if (!btnDelete) return

    this.#idToDelete = btnDelete.closest('[class*="item"]').dataset.id
    this.#modalConfirm.showModal()
  }

  #onClickConfirm = (e) => {
    this.#closeModal(e.target, e.currentTarget)

    const btn = e.target.closest('button')
    if (!btn) return

    const result = btn.closest('[class*="btnDelete"]') ? true : false

    this.#modalConfirm.close(result)
  }

  #onCloseConfirm = (e) => {
    if (this.#modalConfirm.returnValue === 'true') {
      this.#deleteItem()
    }
  }

  #deleteItem() {
    this.#items = this.#items.filter((item) => item.id !== this.#idToDelete)
    this.#renderItems()
  }

  #closeModal(target, modal) {
    if (target === modal) {
      modal.close(false)
    }
  }
}
