import { codeLines, installCommand } from '@/components/landing/CodeShowcase.config'
import { CopyButton } from '@/components/landing/CopyButton'

export let CodeShowcase: React.FC = () => {
  return (
    <div id="showcase" className="relative mx-auto max-w-4xl px-6 pb-24 sm:pb-28">
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-slate-900/20">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-xs text-slate-400">app.tsx</span>
          </div>
          <CopyButton value={installCommand} />
        </div>

        <pre className="overflow-x-auto p-6 text-left font-mono text-sm leading-7">
          <code>
            {codeLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
