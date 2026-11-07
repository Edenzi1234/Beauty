import { brand, contact, included, pricing } from '../content/course'
import LashCurve from './LashCurve'

const formatPrice = (n) => new Intl.NumberFormat('he-IL').format(n)

export default function Register() {
  return (
    <section id="register" className="relative isolate overflow-hidden bg-cocoa py-24 text-porcelain md:py-36">
      <LashCurve className="pointer-events-none absolute -top-6 inset-x-0 -z-10 mx-auto w-[min(140vw,70rem)] text-petal/15" strokeWidth={1} />

      <div className="shell grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <h2 className="display text-[clamp(2.5rem,6.5vw,4.5rem)]">הרשמה לקורס</h2>

          {pricing.price ? (
            <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <p className="flex items-baseline gap-2">
                <span className="sr-only">מחיר הקורס:</span>
                <span className="display text-[clamp(3.5rem,10vw,6rem)] leading-none">{formatPrice(pricing.price)}</span>
                <span className="text-step-1">₪</span>
              </p>
              {pricing.originalPrice && (
                <p className="text-step-1 text-porcelain/55">
                  <span className="sr-only">במקום</span>
                  <del className="display text-step-3 decoration-petal decoration-1">{formatPrice(pricing.originalPrice)} ₪</del>
                </p>
              )}
            </div>
          ) : (
            <p className="mt-6 max-w-[40ch] text-step-1 text-porcelain/80">
              לפרטים על מחיר הקורס ומועדי המחזור הקרוב — דברי איתי.
            </p>
          )}

          {pricing.notes.length > 0 && (
            <ul className="mt-6 space-y-2 text-porcelain/80">
              {pricing.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}

          {import.meta.env.DEV && !pricing.price && (
            <p className="todo-note mt-6 max-w-xl bg-transparent text-petal">
              חסר תוכן: מחיר הקורס — יש
              למלא ב־src/content/course.js
            </p>
          )}

          {contact.phoneDisplay && (
            <p className="mt-10 text-step-1 text-porcelain/70">
              לשאלות והרשמה:{' '}
              <a href={`tel:${contact.phoneDisplay.replace(/\D/g, '')}`} dir="ltr" className="text-porcelain underline decoration-petal/50 underline-offset-4">
                {contact.phoneDisplay}
              </a>
            </p>
          )}
        </div>

        <div className="rounded-[2rem] border border-porcelain/15 p-7 md:p-10">
          <h3 className="display text-step-2">הקורס כולל</h3>
          <ul className="mt-5 space-y-3 text-porcelain/85">
            <li>2 ימי לימוד — עיוני, שיווק ומעשי</li>
            {included.items.map((item) => (
              <li key={item.title}>
                {item.title}
                {item.detail && <span className="text-porcelain/60"> {item.detail}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="shell mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-porcelain/12 pt-8 text-step--1 text-porcelain/55">
        <span className="display text-step-1 tracking-[0.18em] text-porcelain" dir="ltr">
          {brand.name}
        </span>
        <span>
          © {new Date().getFullYear()} {brand.hebrewName}
        </span>
      </footer>
    </section>
  )
}
