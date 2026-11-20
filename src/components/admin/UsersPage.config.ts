import { fetchAdminUsers } from '@/lib/auth/api'
import { queryKeys } from '@/lib/auth/queryKeys'

export let dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export let userIdPreviewLength = 12

export let usersQueryOptions = {
  queryKey: queryKeys.adminUsers,
  queryFn: fetchAdminUsers,
}

export let usersFallbackError = 'Unable to load users'
