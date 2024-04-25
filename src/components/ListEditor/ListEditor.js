import Item from '../../js/Item'
import ListEditorUI from './ListEditorUI'
import { data } from '../../js/data'
import { clearPrice } from '../../js/clearPrice'
import { clearCustomMessage, isInvalid } from '../../js/isInvalid'
import { deleteStartZero } from '../../js/deleteStartZero'

export default class ListEditor {
  #ui
  #app
  #form
  #modal
  #items
  #btnAdd
  #element
  #btnCancel
  #itemsList
  #fieldName
  #fieldPrice
  #modalConfirm
  #idForOperations

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
    this.#btnAdd = this.#app.querySelector('[class*="btnAdd"]')
    this.#form = this.#modal.querySelector('[class*="formItem"]')
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
    this.#btnAdd.addEventListener('click', this.#onAddButton)
    this.#btnCancel.addEventListener('click', this.#onCancel)
    this.#itemsList.addEventListener('click', this.#onClickItems)
    this.#fieldName.addEventListener('input', this.#onInputName)
    this.#fieldPrice.addEventListener('input', this.#onInputPrice)
    this.#modalConfirm.addEventListener('click', this.#onClickConfirm)
    this.#modalConfirm.addEventListener('close', this.#onCloseConfirm)
  }

  #onAddButton = () => {
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

    this.#idForOperations ? this.#updateItem() : this.#addItem()

    this.#renderItems()
    this.#modal.close()
  }

  #onCloseForm = () => {
    this.#resetFields()
  }

  #onInputName = (e) => {
    clearCustomMessage(e.currentTarget)
  }

  #onInputPrice = (e) => {
    clearCustomMessage(e.currentTarget)
    const value = this.#fieldPrice.value
    this.#fieldPrice.value = clearPrice(value)
  }

  #onClickItems = (e) => {
    const btn = e.target.closest('button')
    if (!btn) return

    this.#idForOperations = btn.closest('[class*="item"]').dataset.id

    btn.closest('[class*="btnDelete"]') ? this.#modalConfirm.showModal() : this.#editItem()
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

  /**
   * Выводит список товаров из базы this.#items
   */
  #renderItems() {
    this.#clearItemsList()
    this.#items.forEach((item) => {
      this.#itemsList.append(this.#ui.getItem(item))
    })
  }

  /**
   * Очищает список элементов
   */
  #clearItemsList() {
    this.#itemsList.innerHTML = ''
  }

  /**
   * Удаляет выбранный элемент
   */
  #deleteItem() {
    this.#items = this.#items.filter((item) => item.id !== this.#idForOperations)
    this.#resetId()
    this.#renderItems()
  }

  /**
   * Устанавливает значения в поля формы из данных элемента,
   * и открывает форму для редактирования
   */
  #editItem() {
    this.#setFieldsValues()
    this.#modal.showModal()
  }

  /**
   * Добавляет новый элемент,
   * данные берутся из полей формы
   */
  #addItem() {
    this.#items.push(
      new Item({
        name: this.#fieldName.value,
        price: deleteStartZero(this.#fieldPrice.value),
      }),
    )
  }

  /**
   * Обновляет данные элемента из полей формы
   */
  #updateItem() {
    this.#items.map((item) => {
      if (item.id === this.#idForOperations) {
        item.name = this.#fieldName.value
        item.price = deleteStartZero(this.#fieldPrice.value)
      }
      return item
    })

    this.#resetId()
  }

  /**
   * Закрывает диалог если кликнули за его пределами
   * @param {Element} target элемент вызвавший событие
   * @param {Element} modal элемент диалог
   */
  #closeModal(target, modal) {
    if (target === modal) {
      modal.close(false)
    }
  }

  /**
   * Сбрасывает значения полей формы
   */
  #resetFields() {
    this.#fieldName.value = ''
    this.#fieldPrice.value = ''
  }

  /**
   * Устанавливает значения полей формы из данных выбранного элемента
   */
  #setFieldsValues() {
    const item = this.#items.find((item) => item.id === this.#idForOperations)
    this.#fieldName.value = item.name
    this.#fieldPrice.value = item.price
  }

  /**
   * Сбрасывает ID элемента для операций
   */
  #resetId() {
    this.#idForOperations = null
  }
}
