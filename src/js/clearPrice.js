/**
 * Форматирует значение - удаляет все не цифры
 * @param {String} price стоимость
 * @returns стоимость - только цифры
 */
export const clearPrice = (price) => {
  return price.replace(/\D/g, '')
}
