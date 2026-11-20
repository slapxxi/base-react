import { navLinks } from '@/components/landing/SiteHeader.config'
import { LogoIcon } from '@/components/landing/icons'
import { Link } from 'react-router-dom'

export let SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-slate-900 text-white">
            <LogoIcon className="size-5" />
          </span>
          orbit<span className="text-indigo-600">.</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-slate-950">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Admin
          </Link>
          <a
            href="#showcase"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950 sm:block"
          >
            GitHub
          </a>
          <a
            href="#docs"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  )
}
