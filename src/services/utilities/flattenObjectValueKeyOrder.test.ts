import { flattenObjectValueKeyOrder } from './flattenObjectValueKeyOrder'
import { input1, assert1, input2, assert2 } from '../../lambdas/mock-events/mock-values'

describe('check flatten function', () => {
  test('should correctly format getDogBreed input', () => {
    const flatObj = flattenObjectValueKeyOrder(input1)
    expect(flatObj.join(' ')).toBe(assert1.join(' '))
  })
  test('should correctly format objects with different types', () => {
    const flatObj = flattenObjectValueKeyOrder(input2)
    expect(flatObj.join('')).toBe(assert2.join(''))
  })
})
