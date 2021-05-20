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

describe('it handles errors correctly', () => {
  const generalError = new Error('Something went bananas')
  generalError.name = 'GeneralError'
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => Promise.reject(generalError),
    })
  })

  it('should throw an error if API call throws an error', () => {
    return expect(getDogBreeds()).rejects.toEqual(generalError)
  })
})

describe('it handles the external API timing out ', () => {
  const abortError = new Error('Request to externial API timed out')
  abortError.name = 'AbortError'
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => Promise.reject(abortError),
    })
  })

  it('should throw an AbortError if the AbortController throws an AbortError', () => {
    return expect(getDogBreeds()).rejects.toEqual(abortError)
  })
})
