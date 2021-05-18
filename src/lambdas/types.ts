// types specific to function handlers

export enum Status {
  success = 'success',
  error = 'error',
}

export interface Response {
  statusCode: number
}

export interface ErrorResponse extends Response {
  message: string
}

export interface SuccessResponse<T> extends Response {
  body: T
}

export interface RequestedAPIData<T> {
  status: Status
  data: T | string
}

export type DogBreedSubGroups = {
  [index: string]: string[]
}

export type RequestedDogBreeds = RequestedAPIData<DogBreedSubGroups>
