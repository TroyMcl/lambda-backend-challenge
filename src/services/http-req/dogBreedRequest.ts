import fetch from 'node-fetch'
import AbortController from 'abort-controller'
import { RequestedDogBreeds } from '../../lambdas/types'

export async function getDogBreeds(): Promise<RequestedDogBreeds> {
  const controller = new AbortController()
  let reqTimedOut = false
  const timeout = setTimeout(() => {
    controller.abort()
    reqTimedOut = true
  }, 1500)

  const res = await fetch('https://dog.ceo/api/breeds/list/all', { signal: controller.signal })
  const payload = await res.json()
  clearTimeout(timeout)

  if (reqTimedOut) {
    const error = new Error('Request to externial API timed out')
    error.name = 'RequestTimeOut'
    throw error
  }

  return payload
}
