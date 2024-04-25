import Item from '../Item'

describe('must create an object with the required fields', () => {
  const item = new Item({ name: 'test', price: '123' })

  it('there must be a name', () => {
    expect(item.name).toEqual('test')
  })

  it('there must be a price', () => {
    expect(item.price).toEqual('123')
  })

  it('there must be a id', () => {
    expect(item.id).toBeTruthy()
  })
})
