import { isInvalid } from '../isInvalid'

describe('custom errors should be displayed', () => {
  const name = document.createElement('input')
  name.name = 'name'
  name.value = ''

  const price = document.createElement('input')
  price.name = 'price'
  price.value = ''

  describe('field values', () => {
    it('value name empty', () => {
      expect(isInvalid([name, price])).toEqual(true)
    })

    it('value name error', () => {
      isInvalid([name, price])
      expect(name.validationMessage).toEqual('Нужно ввести название')
    })

    it('value price empty', () => {
      name.value = 'test'
      expect(isInvalid([name, price])).toEqual(true)
    })

    it('value price error', () => {
      isInvalid([name, price])
      expect(price.validationMessage).toEqual('Нужно указать стоимость - число цифрами')
    })
  })

  it('value must be greater than 0', () => {
    price.value = '00'
    isInvalid([name, price])
    expect(price.validationMessage).toEqual('Число должно быть больше 0')
  })
})
