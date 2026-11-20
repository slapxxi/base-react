import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { sessionQueryOptions } from '@/components/auth/AuthProvider.config'
import { loginRequest, logoutRequest } from '@/lib/auth/api'
import { authContext } from '@/lib/auth/authContext'
import { clearSession, setSession } from '@/lib/auth/session'
import type { AuthStatus } from '@/lib/auth/authContext'

type AuthProviderProps = {
  children: React.ReactNode
}

export let AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  let queryClient = useQueryClient()
  let sessionQuery = useQuery(sessionQueryOptions)

  let {
    mutateAsync: loginUser,
    error: loginError,
    isPending: isLoggingIn,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),
    onSuccess: (currentUser) => {
      setSession(queryClient, currentUser)
    },
  })

  let { mutateAsync: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      clearSession(queryClient)
    },
  })

  let login = useCallback(
    (email: string, password: string) => loginUser({ email, password }),
    [loginUser],
  )

  let logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch {}
  }, [logoutUser])

  let user = sessionQuery.data ?? null
  let status: AuthStatus = sessionQuery.isPending
    ? 'loading'
    : user
      ? 'authenticated'
      : 'unauthenticated'

  return (
    <authContext.Provider
      value={{ user, status, login, logout, loginError, isLoggingIn, isLoggingOut }}
    >
      {children}
    </authContext.Provider>
  )
}
