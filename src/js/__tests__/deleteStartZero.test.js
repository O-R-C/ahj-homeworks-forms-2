import { deleteStartZero } from '../deleteStartZero'

it('there should be no zeros at the beginning of the number ', () => {
  expect(deleteStartZero('0012')).toEqual(12)
})
