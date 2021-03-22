import { useRef, useState, useCallback, useDebugValue } from 'react'
import { store } from './store'
import { Fetcher, Url } from './types'

export const setFetcher = <S>(fetcher: Fetcher<S>) => {
  store.setFetcher(fetcher)
}

const checkHasCachedDataInRequest = (url: Url) => {
  return store.get(url)
}

const useSWF = <S>(baseUrl: Url, fetcher?: Fetcher<S>) => {
  const loading = useRef(false)
  const error = useRef<Response | undefined>(undefined)
  const cachedUrl = useRef('')
  const result = useRef<S | Response | undefined>(undefined)
  const previousOptions = useRef(undefined)
  const request = useRef(fetcher ?? store.getFetcher())
  const [, forceRender] = useState(0)

  const reRender = () => {
    forceRender(prev => prev + 1)
  }

  const send = useCallback(
    async (options, url?: Url) => {
      loading.current = true
      result.current = checkHasCachedDataInRequest(url ?? baseUrl)
      reRender()
      previousOptions.current = options

      try {
        const data = await request.current(url ?? baseUrl, options)
        !options.noCache && store.set(url ?? baseUrl, data)
        cachedUrl.current = url ?? baseUrl
        result.current = data
        error.current = undefined
      } catch (err) {
        error.current = err
        result.current = undefined
      }

      loading.current = false
      reRender()
      return { result: result.current, error: error.current }
    },
    [baseUrl]
  )

  const preFetch = useCallback(
    async (options, url?: Url) => {
      try {
        const data = await request.current(url ?? baseUrl, options)
        !options.noCache && store.set(url ?? baseUrl, data)
        cachedUrl.current = url ?? baseUrl
        result.current = data
        error.current = undefined
      } catch (err) {
        error.current = err
        result.current = undefined
      }
    },
    [baseUrl]
  )

  const revalidate = useCallback(async options => {
    try {
      const data = await request.current(cachedUrl.current, previousOptions.current)
      !options.noCache && store.set(cachedUrl.current, data)
      result.current = data
      error.current = undefined
    } catch (err) {
      error.current = err
      result.current = undefined
    }
    reRender()
  }, [])

  const config = {
    result: result.current,
    error: error.current,
    loading: loading.current,
    send,
    preFetch,
    revalidate,
  }

  useDebugValue(config)

  return config
}

export default useSWF
