import { included, location, pricing } from '../content/course'
import PinIcon from './PinIcon'
import LashCurve from './LashCurve'
import SectionHeader from './SectionHeader'

const formatPrice = (n) => new Intl.NumberFormat('he-IL').format(n)

export default function Register() {
  return (
    <section id="register" className="relative isolate overflow-hidden bg-porcelain py-24 md:py-36">
      <LashCurve className="pointer-events-none absolute -top-6 inset-x-0 -z-10 mx-auto w-[min(140vw,70rem)] text-rose/15" strokeWidth={1} />

      <div className="shell grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <SectionHeader label="מחיר והרשמה" title="הרשמה לקורס" />

          {pricing.price ? (
            <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <p className="flex items-baseline gap-2">
                <span className="sr-only">מחיר הקורס:</span>
                <span className="display text-[clamp(3.5rem,10vw,6rem)] leading-none">{formatPrice(pricing.price)}</span>
                <span className="text-step-1">₪</span>
              </p>
              {pricing.originalPrice && (
                <p className="text-step-1 text-cocoa-soft">
                  <span className="sr-only">במקום</span>
                  <del className="display text-step-3 decoration-rose decoration-1">{formatPrice(pricing.originalPrice)} ₪</del>
                </p>
              )}
            </div>
          ) : (
            <p className="mt-6 max-w-[40ch] text-step-1 text-cocoa-soft">לפרטים על מחיר הקורס ומועדי המחזור הקרוב — דברי איתי.</p>
          )}

          <p className="mt-8 flex items-center gap-3 text-step-1">
            <PinIcon className="size-6 shrink-0 text-rose" />
            <span>
              <span className="font-semibold">מיקום הקורס:</span> {location.city}, {location.area}
            </span>
          </p>

          {pricing.notes.length > 0 && (
            <ul className="mt-6 space-y-2 text-cocoa-soft">
              {pricing.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}

          {import.meta.env.DEV && !pricing.price && (
            <p className="todo-note mt-6 max-w-xl">חסר תוכן: מחיר הקורס — יש למלא ב־src/content/course.js</p>
          )}
        </div>

        <div className="rounded-[2rem] bg-blush p-7 md:p-10">
          <h3 className="display text-step-2">הקורס כולל</h3>
          <ul className="mt-5 space-y-3">
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-rose" />
              <span>
                2 ימי לימוד <span className="text-cocoa-soft">עיוני, שיווק ומעשי</span>
              </span>
            </li>
            {included.items.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-rose" />
                <span>
                  {item.title}
                  {item.detail && <span className="text-cocoa-soft"> {item.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  )
}
