import { getDogBreeds } from '../services/http-req/dogBreedRequest'
import { flattenObjectValueKeyOrder } from '../services/utilities/flattenObjectValueKeyOrder'
import { RequestedDogBreeds, ErrorResponse, SuccessResponse } from './types'

export const getBreeds = async (): Promise<SuccessResponse<string[]> | ErrorResponse> => {
  try {
    const apiData: RequestedDogBreeds = await getDogBreeds()
    if (apiData.status === 'error') {
      throw new Error('Something went wrong')
    }
    const payload: string[] = flattenObjectValueKeyOrder(apiData.data)
    return {
      statusCode: 200,
      body: payload,
    }
  } catch (err) {
    return {
      statusCode: 500,
      message: err.message,
    }
  }
}
