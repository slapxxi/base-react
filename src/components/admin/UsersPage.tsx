import { useEffect, useState } from 'react'
import { dateFormatter, userIdPreviewLength } from '@/components/admin/UsersPage.config'
import { ApiError, fetchAdminUsers } from '@/lib/auth/api'
import type { AuthUser } from '@/lib/auth/types'
import { useAuth } from '@/lib/auth/useAuth'

export let UsersPage: React.FC = () => {
  let { logout } = useAuth()
  let [users, setUsers] = useState<AuthUser[]>([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState('')

  useEffect(() => {
    fetchAdminUsers()
      .then(setUsers)
      .catch((err: unknown) => {
        if (err instanceof ApiError && err.status === 401) {
          void logout()
          return
        }
        setError(err instanceof Error ? err.message : 'Unable to load users')
      })
      .finally(() => setLoading(false))
  }, [logout])

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="mt-1 text-sm text-slate-500">Accounts stored by the Go auth service.</p>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">User ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="transition hover:bg-slate-50/70">
                <td className="px-6 py-4 font-medium text-slate-900">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {dateFormatter.format(new Date(user.createdAt))}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-400">{user.id.slice(0, userIdPreviewLength)}…</td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p className="px-6 py-10 text-center text-sm text-slate-500">Loading accounts…</p>}
        {!loading && users.length === 0 && !error && (
          <p className="px-6 py-10 text-center text-sm text-slate-500">No accounts found.</p>
        )}
      </div>
    </div>
  )
}
