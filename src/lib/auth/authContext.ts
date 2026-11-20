import { createContext } from 'react'
import type { AuthUser } from '@/lib/auth/types'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type AuthContextValue = {
  user: AuthUser | null
  status: AuthStatus
  login: (email: string, password: string) => Promise<AuthUser>
  logout: () => Promise<void>
}

export let authContext = createContext<AuthContextValue | null>(null)
