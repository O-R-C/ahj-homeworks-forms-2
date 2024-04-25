import { errors } from './errors'

/**
 * Проверяет поля на наличии ошибок валидации,
 * устанавливает кастомное сообщение
 * @param {Array} arr массив полей для валидации
 */
export const isInvalid = (arr) => {
  return arr.some((element) => {
    let error = null

    if (element.name === 'price' && Number(element.value) <= 0) {
      error = 'moreThanZero'
    }

    if (!element.value) {
      error = 'valueMissing'
    }

    checkError(error, element)

    return error ? true : false
  })
}

const checkError = (error, element) => {
  error && setError(error, element)
  !error && clearCustomMessage(element)
}

const setError = (error, element) => {
  element.setCustomValidity(errors[element.name][error])
  element.reportValidity()
}

export const clearCustomMessage = (element) => {
  element.setCustomValidity('')
}
