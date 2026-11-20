import { LogoutIcon, MenuIcon } from '@/components/admin/icons'
import { useAuth } from '@/lib/auth/useAuth'

type AdminHeaderProps = {
  onOpenSidebar: () => void
}

export let AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenSidebar }) => {
  let { user, logout, isLoggingOut } = useAuth()

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
        >
          <MenuIcon className="size-5" />
        </button>
        <div>
          <p className="text-xs text-slate-500">Signed in as</p>
          <p className="text-sm font-semibold text-slate-900">{user?.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 uppercase sm:inline">
          {user?.role}
        </span>
        <button
          type="button"
          onClick={() => void logout()}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogoutIcon className="size-4" />
          Sign out
        </button>
      </div>
    </header>
  )
}
