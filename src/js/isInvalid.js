import { errors } from './errors'

/**
 * Проверяет поля на наличии ошибок валидации,
 * устанавливает кастомное сообщение
 * @param {Array} arr массив полей для валидации
 */
export const isInvalid = (arr) => {
  return arr.some((element) => {
    if (!element.value) {
      element.setCustomValidity(errors[element.name].valueMissing)
      element.reportValidity()
      return true
    } else {
      clearCustomMessage(element)
    }
  })
}

export const clearCustomMessage = (element) => {
  element.setCustomValidity('')
}
