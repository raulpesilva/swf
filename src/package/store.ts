import { Url } from './types'

class Store {
  #store = new Map()
  #fetcher = async (url: Url) => await fetch(url, { method: 'get' })

  get(url: Url) {
    return this.#store.get(url)
  }

  set(url: Url, value: unknown) {
    this.#store.set(url, value)
  }

  setFetcher(fetcher: (url: Url, options?: any) => any) {
    this.#fetcher = fetcher
  }

  getFetcher() {
    return this.#fetcher
  }
}

export const store = new Store()
