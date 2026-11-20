import { fetchCurrentUser } from '@/lib/auth/api'
import { queryKeys } from '@/lib/auth/queryKeys'

export let sessionQueryOptions = {
  queryKey: queryKeys.session,
  queryFn: fetchCurrentUser,
  staleTime: 5 * 60 * 1000,
  retry: false,
}
