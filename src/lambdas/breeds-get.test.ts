import { getBreeds } from './breeds-get'
import { input1, assert1 } from './mock-events/mock-values'
import * as req from '../services/http-req/dogBreedRequest'

import { Status } from './types'

jest
  .spyOn(req, 'getDogBreeds')
  .mockImplementation((): any => ({ status: Status.success, message: input1 }))

describe('test successful API call', () => {
  it('should return 200 for a successful call', async () => {
    const response = await getBreeds()
    expect(response.statusCode).toBe(200)
  })

  it('should have a correctly formated body array', async () => {
    const response: any = await getBreeds()
    expect(response.body.length).toEqual(assert1.length)
    expect(response.body).toEqual(assert1)
  })
})

describe('test errors', () => {
  it('should throw an error if the API returns an error', async () => {
    jest
      .spyOn(req, 'getDogBreeds')
      .mockImplementation((): any => Promise.reject(new Error('Something went wrong')))
    const response: any = await getBreeds()
    expect(response.statusCode).toBe(500)
    expect(response.message).toEqual('Something went wrong')
  })

  it('should forwared the timeout error', async () => {
    jest.spyOn(req, 'getDogBreeds').mockImplementation((): any => {
      const error = new Error('Request to externial API timed out')
      error.name = 'AbortError'
      return Promise.reject(error)
    })
    const response: any = await getBreeds()
    expect(response.statusCode).toBe(408)
    expect(response.message).toEqual('Request to externial API timed out')
  })
})
