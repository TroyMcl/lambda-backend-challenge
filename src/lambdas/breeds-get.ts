import { getDogBreeds } from '../services/http-req/dogBreedRequest'
import { flattenObjectValueKeyOrder } from '../services/utilities/flattenObjectValueKeyOrder'
import { generateErrorResponse } from '../services/gererateErrorResponse'
import { RequestedDogBreeds, ErrorResponse, SuccessResponse } from './types'

export const getBreeds = async (): Promise<SuccessResponse<string[]> | ErrorResponse> => {
  try {
    const apiData: RequestedDogBreeds = await getDogBreeds()
    const payload: string[] = flattenObjectValueKeyOrder(apiData.message)
    return {
      statusCode: 200,
      body: payload,
    }
  } catch (err: unknown) {
    return generateErrorResponse(err)
  }
}
