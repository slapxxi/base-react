import { environmentVariables, settings } from '@/components/admin/SettingsPage.config'

export let SettingsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Security defaults configured by the auth service.</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {settings.map((setting) => (
          <div key={setting.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-sm font-semibold text-slate-900">{setting.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">{setting.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-200">
        <h2 className="text-sm font-semibold text-white">Required environment variables</h2>
        <p className="mt-2 text-sm leading-7 text-slate-400">
          The service refuses to start until these are set. There is no built-in demo account.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-xs leading-6 text-emerald-300">
          {environmentVariables}
        </pre>
      </div>
    </div>
  )
}
