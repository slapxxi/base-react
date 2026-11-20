import { Fragment } from 'react'
import { CopyButton } from '@/components/landing/CopyButton'
import { installCommand } from '@/components/landing/content'

let codeLines: React.ReactNode[] = [
  <span key="comment-one" className="text-slate-500">
    {'// Install the toolkit'}
  </span>,
  <Fragment key="install">
    <span className="text-pink-400">npm</span> <span className="text-sky-300">install</span>{' '}
    <span className="text-emerald-300">orbit-ui</span>
  </Fragment>,
  <span key="blank-one">&nbsp;</span>,
  <span key="comment-two" className="text-slate-500">
    {'// Compose your interface'}
  </span>,
  <Fragment key="import">
    <span className="text-pink-400">import</span> <span className="text-slate-200">{'{ Button }'}</span>{' '}
    <span className="text-pink-400">from</span> <span className="text-emerald-300">{'orbit-ui'}</span>
  </Fragment>,
  <span key="blank-two">&nbsp;</span>,
  <Fragment key="function">
    <span className="text-pink-400">export function</span> <span className="text-yellow-200">App</span>
    <span className="text-slate-200">() {'{'}</span>
  </Fragment>,
  <Fragment key="return">
    {'  '}
    <span className="text-pink-400">return</span> <span className="text-slate-200">{'<'}</span>
    <span className="text-sky-300">Button</span> <span className="text-amber-200">variant</span>
    <span className="text-slate-200">=</span>
    <span className="text-emerald-300">{'"primary"'}</span>
    <span className="text-slate-200">{'>'}</span>
    Get started
    <span className="text-slate-200">{'</'}</span>
    <span className="text-sky-300">Button</span>
    <span className="text-slate-200">{'>'}</span>
  </Fragment>,
  <span key="closing" className="text-slate-200">
    {'}'}
  </span>,
]

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
