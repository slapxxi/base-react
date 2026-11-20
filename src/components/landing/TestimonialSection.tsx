import { StarIcon } from '@/components/landing/icons'

export let TestimonialSection: React.FC = () => {
  return (
    <section id="community" className="border-y border-slate-200 bg-slate-50/70 py-24">
      <figure className="mx-auto max-w-3xl px-6 text-center">
        <div className="flex justify-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((star) => (
            <StarIcon key={star} className="size-5" />
          ))}
        </div>
        <blockquote className="mt-8 text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
          &ldquo;Orbit gave us a shared language between design and engineering. We shipped our
          redesign in weeks, not months.&rdquo;
        </blockquote>
        <figcaption className="mt-8 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Maya Chen</span>
          <span className="mx-2 text-slate-300">|</span>
          Head of Product, Northwind
        </figcaption>
      </figure>
    </section>
  )
}
