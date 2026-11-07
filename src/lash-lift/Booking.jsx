import LashCurve from '../components/LashCurve'
import PinIcon from '../components/PinIcon'
import { bookingUrl, location } from '../content/lashLift'

export default function Booking() {
  return (
    <section id="book" className="relative isolate overflow-hidden bg-blush py-24 text-center md:py-36">
      <LashCurve className="pointer-events-none absolute -top-6 inset-x-0 -z-10 mx-auto w-[min(140vw,70rem)] text-rose/20" strokeWidth={1} />
      <div className="shell flex flex-col items-center">
        <h2 className="display text-[clamp(2.75rem,8vw,5rem)]">מחכה לך בקליניקה</h2>
        <p className="mt-4 max-w-[36ch] text-step-1 text-cocoa-soft">בוחרים יום ושעה שנוחים לך באפליקציית התורים.</p>
        <a href={bookingUrl} target="_blank" rel="noopener" className="btn btn-solid mt-10 min-h-16 px-12 text-step-1">
          לקביעת תור
        </a>
        <p className="mt-8 flex items-center gap-2 text-cocoa-soft">
          <PinIcon className="size-5 shrink-0 text-rose" />
          {location}
        </p>
      </div>
    </section>
  )
}
