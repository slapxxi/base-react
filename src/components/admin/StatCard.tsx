type StatCardProps = {
  label: string
  value: string | number
  hint: string
}

export let StatCard: React.FC<StatCardProps> = ({ label, value, hint }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-400">{hint}</p>
    </div>
  )
}
