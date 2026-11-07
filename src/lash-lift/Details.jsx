import PinIcon from '../components/PinIcon'
import SectionHeader from '../components/SectionHeader'
import { details, location } from '../content/lashLift'

export default function Details() {
  return (
    <section id="details" className="bg-blush py-24 md:py-36">
      <div className="shell">
        <SectionHeader label={details.label} title={details.title} />

        <dl className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
          {details.facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse justify-end rounded-[1.75rem] bg-porcelain p-8 md:p-10">
              <dt className="mt-3 text-step-1">
                {f.label}
                {f.note && <span className="block text-step-0 text-cocoa-soft">{f.note}</span>}
              </dt>
              <dd className="display text-[clamp(3rem,7vw,4.5rem)] leading-none">{f.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 flex items-center gap-3 text-step-1">
          <PinIcon className="size-6 shrink-0 text-rose" />
          <span>
            <span className="font-semibold">הקליניקה נמצאת ב</span>
            {location}
          </span>
        </p>
      </div>
    </section>
  )
}
