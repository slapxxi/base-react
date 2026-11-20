import { CodeShowcase } from '@/components/landing/CodeShowcase'
import { primaryButton, secondaryButton } from '@/components/landing/HeroSection.config'

export let HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 text-center sm:pt-28">
        <a
          href="#showcase"
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
        >
          <span className="size-1.5 rounded-full bg-indigo-500" />
          Orbit 2.0 is here
          <span aria-hidden="true">&rarr;</span>
        </a>

        <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Build interfaces that feel{' '}
          <span className="bg-linear-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">inevitable</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          A small, composable React toolkit with accessible components, thoughtful defaults, and a design system that
          gets out of your way.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#docs" className={primaryButton}>
            Start building
            <span aria-hidden="true">&rarr;</span>
          </a>
          <a href="#features" className={secondaryButton}>
            Explore components
          </a>
        </div>

        <p className="mt-5 text-sm text-slate-500">
          Free and open source &middot; MIT licensed &middot; No setup required
        </p>
      </div>

      <CodeShowcase />
    </section>
  )
}
