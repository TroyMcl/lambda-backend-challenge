import { flattenObjectValueKeyOrder } from './flattenObjectValueKeyOrder'
import { input1, assert1 } from '../../lambdas/mock-events/mock-values'

describe('check flatten function', () => {
  test('should correctly format correct input', () => {
    const flatObj = flattenObjectValueKeyOrder(input1)
    expect(flatObj.join(' ')).toBe(assert1.join(' '))
  })
})
