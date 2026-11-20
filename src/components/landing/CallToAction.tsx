export let CallToAction: React.FC = () => {
  return (
    <section id="docs" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            Ready to build something great?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-300">
            Install the toolkit, grab a component, and make it yours. It really is that simple.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#showcase"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              Get started for free
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read the docs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
