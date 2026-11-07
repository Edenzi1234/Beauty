import { included } from '../content/course'
import SectionHeader from './SectionHeader'

export default function Included() {
  return (
    <section id="included" className="overflow-hidden pt-16 md:pt-32">
      <div className="shell grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="md:pb-12">
          <SectionHeader label={included.label} title={included.title} />
          <dl className="mt-10">
            {included.items.map((item) => (
              <div key={item.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-cocoa/12 py-5">
                <dt className="display text-step-2">{item.title}</dt>
                {item.detail && <dd className="text-cocoa-soft">{item.detail}</dd>}
              </div>
            ))}
          </dl>
        </div>

        <div className="arch mx-auto mb-16 w-full max-w-md md:mb-28">
          <img
            src={included.image}
            alt={included.imageAlt}
            loading="lazy"
            width="1100"
            height="1375"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
