import { features } from '@/components/landing/content'

export let FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase">Why Orbit</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Everything you need. Nothing you don&apos;t.
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Carefully considered pieces that work together, so you can focus on what makes your
          product different.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          let Icon = feature.icon

          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
