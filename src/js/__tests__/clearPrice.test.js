import { clearPrice } from '../clearPrice'

it('should be only numbers ', () => {
  expect(clearPrice('qwerty12345qwerty-_.,888')).toEqual('12345888')
})
