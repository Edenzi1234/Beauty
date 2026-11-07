import { included } from '../content/course'
import SectionHeader from './SectionHeader'

export default function Included() {
  return (
    <section id="included" className="overflow-hidden pt-16 md:pt-32">
      <div className="shell grid items-end gap-12 md:grid-cols-2 md:gap-16">
        <div className="pb-12 md:pb-28">
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

        <div className="relative mx-auto w-full max-w-md">
          <div className="arch absolute inset-x-0 bottom-0 top-[10%] bg-gradient-to-b from-blush to-petal" />
          <img
            src={included.image}
            alt={included.imageAlt}
            loading="lazy"
            width="849"
            height="1011"
            className="relative mx-auto w-[94%]"
          />
        </div>
      </div>
    </section>
  )
}
