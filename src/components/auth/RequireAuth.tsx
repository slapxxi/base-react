import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/auth/useAuth'

type RequireAuthProps = {
  children: React.ReactNode
}

export let RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  let { status } = useAuth()
  let location = useLocation()

  if (status === 'loading') {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span className="size-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
          Checking your session…
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
