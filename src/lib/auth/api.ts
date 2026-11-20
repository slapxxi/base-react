import type { AdminOverview, AuthUser } from '@/lib/auth/types'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      let body = (await response.json()) as { error?: string }
      if (body.error) {
        message = body.error
      }
    } catch {}
    throw new ApiError(response.status, message)
  }

  if (response.status === 204) {
    return undefined as T
  }
  return (await response.json()) as T
}

export let fetchCurrentUser = () => request<AuthUser>('/api/auth/me')

export let loginRequest = async (email: string, password: string): Promise<AuthUser> => {
  let result = await request<{ user: AuthUser }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  return result.user
}

export let logoutRequest = () => request<{ ok: boolean }>('/api/auth/logout', { method: 'POST' })

export let fetchAdminOverview = () => request<AdminOverview>('/api/admin/overview')

export let fetchAdminUsers = async (): Promise<AuthUser[]> => {
  let result = await request<{ users: AuthUser[] }>('/api/admin/users')
  return result.users
}
