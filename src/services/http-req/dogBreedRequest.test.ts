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
        return { status: 'success', message: mockPayload }
      },
    })
  })

  it('should return the correct payload from a sucessful fetch request', async () => {
    const response = await getDogBreeds()
    expect(response.status).toBe('success')
    expect(response.message).toMatchObject(input1)
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

  it('should bubble up an error from the external API call', async () => {
    let response
    try {
      response = await getDogBreeds()
    } catch (err) {
      response = err
    }
    expect(response instanceof Error).toBe(true)
    expect(response.message).toEqual('I broke somewhere')
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
    let response
    try {
      response = await getDogBreeds()
    } catch (err) {
      response = err
    }
    expect(response instanceof Error).toBe(true)
    expect(response.name).toBe('RequestTimeOut')
    expect(response.message).toBe('Request to externial API timed out')
  })
})
