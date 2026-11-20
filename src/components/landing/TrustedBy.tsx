import { trustedBy } from '@/components/landing/content'

export let TrustedBy: React.FC = () => {
  return (
    <section className="border-b border-slate-200 bg-slate-50/70 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase">
          Trusted by product teams everywhere
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-lg font-bold tracking-tight text-slate-400">
          {trustedBy.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
