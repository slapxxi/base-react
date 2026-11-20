import type { QueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/auth/queryKeys'
import type { AuthUser } from '@/lib/auth/types'

export let setSession = (queryClient: QueryClient, user: AuthUser) => {
  queryClient.setQueryData(queryKeys.session, user)
}

export let clearSession = (queryClient: QueryClient) => {
  queryClient.clear()
  queryClient.setQueryData(queryKeys.session, null)
}
