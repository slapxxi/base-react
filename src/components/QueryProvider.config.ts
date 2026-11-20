import { QueryCache, QueryClient, type DefaultOptions } from '@tanstack/react-query'
import { ApiError } from '@/lib/auth/api'
import { clearSession } from '@/lib/auth/session'

export let queryClientOptions: { defaultOptions: DefaultOptions } = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
}

export let createQueryClient = () => {
  let client: QueryClient | undefined

  let queryCache = new QueryCache({
    onError: (error) => {
      if (error instanceof ApiError && error.status === 401 && client) {
        clearSession(client)
      }
    },
  })

  let created = new QueryClient({ ...queryClientOptions, queryCache })
  client = created
  return created
}
