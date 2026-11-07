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
      {/* Real messages from students, shown as message bubbles: swipe on phones, columns on larger screens */}
      <div className="snap-row mt-12 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-4 md:shell md:block md:columns-2 md:gap-6 md:overflow-visible md:px-0 lg:columns-3">
        {testimonials.map((t) => (
          <figure
            key={t.text}
            className="w-[80vw] max-w-sm shrink-0 snap-center rounded-[1.75rem] rounded-ss-md bg-white p-7 shadow-[0_18px_40px_-24px_rgb(168_94_106/0.45)] md:mb-6 md:w-auto md:max-w-none md:break-inside-avoid"
          >
            <blockquote className="whitespace-pre-line text-step-1 leading-relaxed">{t.text}</blockquote>
            {(t.name || t.role) && (
              <figcaption className="mt-6 text-step--1">
                {t.name && <span className="font-semibold">{t.name}</span>}
                {t.role && <span className="block text-cocoa-soft">{t.role}</span>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  )
}
