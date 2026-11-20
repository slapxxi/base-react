import { useState } from 'react'

type CopyButtonProps = {
  value: string
}

export let CopyButton: React.FC<CopyButtonProps> = ({ value }) => {
  let [copied, setCopied] = useState(false)

  let handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
