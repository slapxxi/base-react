import { Link } from 'react-router-dom'

export let NotFoundPage: React.FC = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center">
      <div>
        <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-slate-500">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
