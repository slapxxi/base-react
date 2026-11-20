import { links } from '@/components/admin/AdminSidebar.config'
import { LogoIcon } from '@/components/landing/icons'
import { NavLink } from 'react-router-dom'

type AdminSidebarProps = {
  open: boolean
  onClose: () => void
}

export let AdminSidebar: React.FC<AdminSidebarProps> = ({ open, onClose }) => {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
        />
      )}

      <aside
        className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-64 flex-col
          border-r border-slate-200 bg-white transition-transform lg:static
        lg:translate-x-0`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6 text-lg font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-slate-900 text-white">
            <LogoIcon className="size-5" />
          </span>
          orbit<span className="text-indigo-600">.</span>
          <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
            Admin
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {links.map((link) => {
            let Icon = link.icon

            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="size-5" />
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <p className="text-xs leading-5 text-slate-400">
            Protected by a Go auth service using signed, HttpOnly session cookies.
          </p>
        </div>
      </aside>
    </>
  )
}
