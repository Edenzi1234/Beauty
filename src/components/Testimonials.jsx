import { testimonials } from '../content/course'

export default function Testimonials() {
  if (testimonials.length === 0) {
    // Nothing to show publicly until real testimonials are added
    if (!import.meta.env.DEV) return null
    return (
      <section className="py-20">
        <div className="shell">
          <h2 className="display text-[clamp(2.25rem,5.5vw,3.75rem)]">מה אומרות התלמידות</h2>
          <p className="todo-note mt-6 max-w-xl">
            חסר תוכן: המלצות אמיתיות. יש להוסיף אותן למערך testimonials ב־src/content/course.js — עד אז האזור מוסתר
            בגרסה המפורסמת.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-24 md:py-36">
      <div className="shell">
        <h2 className="display text-[clamp(2.25rem,5.5vw,3.75rem)]">מה אומרות התלמידות</h2>
      </div>
      <div className="snap-row shell mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {testimonials.map((t) => (
          <figure key={t.name + t.text} className="flex w-[82vw] max-w-md shrink-0 snap-start flex-col justify-between rounded-3xl bg-blush/60 p-8">
            <blockquote className="display text-step-2 leading-snug">״{t.text}״</blockquote>
            <figcaption className="mt-8 text-step--1">
              <span className="font-semibold">{t.name}</span>
              {t.role && <span className="block text-cocoa-soft">{t.role}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
