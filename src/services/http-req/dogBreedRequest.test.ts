import fetch from 'node-fetch'
import { getDogBreeds } from './dogBreedRequest'
import { input1 } from '../../lambdas/mock-events/mock-values'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('fetching api data for dog breeds', () => {
  const mockPayload = input1
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
  })

  it('should return the correct payload and status from a sucessful fetch request', async () => {
    const response = await getDogBreeds()
    expect(response.status).toEqual('success')
    expect(response.data).toMatchObject(input1)
  })
})

describe('handling errors from the external call', () => {
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        throw new Error('I broke somewhere')
      },
    })
  })

  it('should handle the error and bubble up the correct data to its invoking function', async () => {
    const response = await getDogBreeds()
    expect(response.status).toEqual('error')
    expect(response.data).toEqual('I broke somewhere')
  })
})

describe('it handles the external API timing out', () => {
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ this: 'should not matter' })
          }, 3000)
        })
      },
    })
  })

  it('should return the correct status and message for a timed out API call', async () => {
    const response = await getDogBreeds()
    expect(response.status).toEqual('error')
    expect(response.data).toBe('Request to externial API timed out')
  })
})
