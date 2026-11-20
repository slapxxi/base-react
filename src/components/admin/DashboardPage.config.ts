import { fetchAdminOverview } from '@/lib/auth/api'
import { queryKeys } from '@/lib/auth/queryKeys'

export let overviewQueryOptions = {
  queryKey: queryKeys.adminOverview,
  queryFn: fetchAdminOverview,
}

export let overviewFallbackError = 'Unable to load overview'
