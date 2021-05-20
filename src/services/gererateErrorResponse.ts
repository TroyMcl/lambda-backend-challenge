import { ErrorResponse } from '../lambdas/types'

export const generateErrorResponse = (error: unknown): ErrorResponse => {
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return {
        statusCode: 408,
        message: 'Request to externial API timed out',
      }
    }
  }
  return {
    statusCode: 500,
    message: 'Something went wrong',
  }
}
