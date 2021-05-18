import { getBreeds } from './breeds-get'
import { input1, assert1 } from './mock-events/mock-values'
import * as req from '../services/http-req/dogBreedRequest'

import { Status } from './types'

jest
  .spyOn(req, 'getDogBreeds')
  .mockImplementation((): any => ({ status: Status.success, data: input1 }))

describe('test successful API call', () => {
  it('should return 200 for a successful call', async () => {
    const response = await getBreeds()
    expect(response.statusCode).toBe(200)
  })

  it('should have a correctly formated body array', async () => {
    const response: any = await getBreeds()
    expect(response.body.length).toEqual(assert1.length)
    expect(response.body.join(' ')).toEqual(assert1.join(' '))
  })
})

describe('test errors', () => {
  it('should throw an error if the API result sets the status to error', async () => {
    jest
      .spyOn(req, 'getDogBreeds')
      .mockImplementation((): any => ({ status: Status.error, data: 'Error from API' }))
    const response: any = await getBreeds()
    expect(response.statusCode).toBe(500)
    expect(response.message).toEqual('Something went wrong')
  })

  it('should forwared Error if the API fails', async () => {
    jest.spyOn(req, 'getDogBreeds').mockImplementation((): any => {
      return Promise.reject(new Error('There was a problem with the API request'))
    })
    const response: any = await getBreeds()
    expect(response.statusCode).toBe(500)
    expect(response.message).toEqual('There was a problem with the API request')
  })
})
