import { ErrorResponse } from '../lambdas/types'

export const generateErrorResponse = (error: unknown): ErrorResponse => {
  const response = {
    statusCode: 500,
    message: 'Something went wrong',
  }
  if (error instanceof Error) {
    if (error.name === 'RequestTimeOut') {
      response.statusCode = 408
      response.message = 'Request to externial API timed out'
    }
  }
  return response
}
