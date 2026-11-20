import { useCallback, useEffect, useState } from 'react'
import { authContext } from '@/lib/auth/authContext'
import { fetchCurrentUser, loginRequest, logoutRequest } from '@/lib/auth/api'
import type { AuthStatus } from '@/lib/auth/authContext'
import type { AuthUser } from '@/lib/auth/types'

type AuthProviderProps = {
  children: React.ReactNode
}

export let AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  let [user, setUser] = useState<AuthUser | null>(null)
  let [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    let active = true

    fetchCurrentUser()
      .then((currentUser) => {
        if (active) {
          setUser(currentUser)
          setStatus('authenticated')
        }
      })
      .catch(() => {
        if (active) {
          setUser(null)
          setStatus('unauthenticated')
        }
      })

    return () => {
      active = false
    }
  }, [])

  let login = useCallback(async (email: string, password: string) => {
    let currentUser = await loginRequest(email, password)
    setUser(currentUser)
    setStatus('authenticated')
    return currentUser
  }, [])

  let logout = useCallback(async () => {
    await logoutRequest()
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  return <authContext.Provider value={{ user, status, login, logout }}>{children}</authContext.Provider>
}
