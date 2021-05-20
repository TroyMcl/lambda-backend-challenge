import fetch from 'node-fetch'
import AbortController from 'abort-controller'
import { RequestedDogBreeds } from '../../lambdas/types'

export async function getDogBreeds(): Promise<RequestedDogBreeds> {
  const controller = new AbortController()
  const timeout = setTimeout(() => {
    controller.abort()
  }, 1500)

  const res = await fetch('https://dog.ceo/api/breeds/list/all', { signal: controller.signal })
  const payload = await res.json()
  clearTimeout(timeout)

  return payload
}
