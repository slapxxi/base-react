import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  overviewFallbackError,
  overviewQueryOptions,
} from '@/components/admin/DashboardPage.config'
import { StatCard } from '@/components/admin/StatCard'

export let DashboardPage: React.FC = () => {
  let { data: overview, error } = useQuery(overviewQueryOptions)

  let errorMessage = error instanceof Error ? error.message : overviewFallbackError

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-slate-500">A live view of your protected admin area.</p>
      </div>

      {error && (
        <div
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Accounts"
          value={overview?.users ?? '—'}
          hint="Total users in the auth store"
        />
        <StatCard
          label="Administrators"
          value={overview?.admins ?? '—'}
          hint="Users with admin access"
        />
        <StatCard
          label="Auth service"
          value={overview?.service ?? '—'}
          hint="Go service behind this panel"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-semibold">Quick actions</h2>
          <p className="mt-1 text-sm text-slate-500">Common places to start.</p>
          <div className="mt-5 space-y-3">
            <Link
              to="/admin/users"
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-indigo-300 hover:bg-indigo-50/50"
            >
              View all accounts
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-indigo-300 hover:bg-indigo-50/50"
            >
              Review security settings
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-semibold">System status</h2>
          <p className="mt-1 text-sm text-slate-500">Current runtime information.</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Session</dt>
              <dd className="flex items-center gap-2 font-medium text-emerald-700">
                <span className="size-2 rounded-full bg-emerald-500" />
                Active
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Session storage</dt>
              <dd className="font-medium">HttpOnly cookie</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Session lifetime</dt>
              <dd className="font-medium">12 hours</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
