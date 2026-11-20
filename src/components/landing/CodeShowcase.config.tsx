import { Fragment } from 'react'

export let installCommand = 'npm install orbit-ui'

export let codeLines: React.ReactNode[] = [
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
