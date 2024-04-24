import Button from '../ui/Button/Button'
import Div from '../ui/Div/Div'
import Form from '../ui/Form/Form'
import Input from '../ui/Input/Input'
import Label from '../ui/Label/Label'

import styles from './FormItem.module.css'

export default class FormItem {
  #classes

  /**
   *
   * @param {String|String[]} classes
   */
  constructor(classes) {
    this.#classes = classes
  }

  /**
   * @returns элемент
   */
  get element() {
    return this.#createElement()
  }

  #createElement() {
    const formItem = new Form({ classes: this.#getClasses(this.#classes) }).element
    const labelName = new Label({
      classes: styles.labelName,
      title: 'Название',
    }).element
    const fieldName = new Input({
      classes: styles.fieldName,
      name: 'name',
      placeholder: 'Введите название',
    }).element
    const labelPrice = new Label({
      classes: styles.labelPrice,
      title: 'Стоимость',
    }).element
    const fieldPrice = new Input({
      classes: styles.fieldPrice,
      name: 'price',
      placeholder: 'Введите стоимость',
    }).element
    const controls = new Div({ classes: styles.controls }).element
    const btnSave = new Button({
      classes: styles.btnSave,
      title: 'Сохранить',
      type: 'submit',
    }).element
    const btnCancel = new Button({
      classes: styles.btnCancel,
      title: 'Отмена',
    }).element

    labelName.append(fieldName)
    labelPrice.append(fieldPrice)
    controls.append(btnSave, btnCancel)
    formItem.append(labelName, labelPrice, controls)

    formItem.noValidate = true

    return formItem
  }

  #getClasses(classes) {
    const classesArray = Array.isArray(classes) ? classes : [classes]

    return classesArray.reduce(
      (acc, className) => {
        if (className) return [...acc, className]
        return acc
      },
      [styles.formItem],
    )
  }
}
