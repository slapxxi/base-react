import { LogoIcon } from '@/components/landing/icons'

export let SiteFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
              <span className="grid size-8 place-items-center rounded-lg bg-slate-900 text-white">
                <LogoIcon className="size-5" />
              </span>
              orbit<span className="text-indigo-600">.</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
              A small toolkit for building interfaces that feel effortless.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>
                <a href="#features" className="hover:text-slate-900">
                  Features
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-slate-900">
                  Components
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-slate-900">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>
                <a href="#showcase" className="hover:text-slate-900">
                  Examples
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-slate-900">
                  Community
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-slate-900">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-slate-900">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Orbit UI. Released under the MIT license.</p>
          <p>Built with React and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
