import fetch from 'node-fetch'
import AbortController from 'abort-controller'
import { Status, RequestedDogBreeds } from '../../lambdas/types'

export async function getDogBreeds(): Promise<RequestedDogBreeds> {
  const controller = new AbortController()
  let reqTimedOut = false
  const timeout = setTimeout(() => {
    controller.abort()
    reqTimedOut = true
  }, 1500)

  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all', { signal: controller.signal })
    const payload = await res.json()
    clearTimeout(timeout)

    if (reqTimedOut) {
      throw new Error('Request to externial API timed out')
    }

    return {
      status: Status.success,
      data: payload,
    }
  } catch (err: any) {
    return {
      status: Status.error,
      data: err.message || 'Something went wrong',
    }
  }
}
