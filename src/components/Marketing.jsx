import { marketing } from '../content/course'
import SectionHeader from './SectionHeader'

export default function Marketing() {
  return (
    <section id="marketing" className="bg-blush py-24 md:py-36">
      <div className="shell">
        <SectionHeader label={marketing.label} title={marketing.title} subtitle={marketing.intro} />

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
          {marketing.topics.map((topic) => (
            <article key={topic.title} className="rounded-[1.75rem] bg-porcelain p-7 md:p-9">
              <h3 className="display text-step-2 leading-tight">{topic.title}</h3>
              <p className="mt-4 text-cocoa-soft">{topic.body}</p>
            </article>
          ))}
        </div>

        {/* The method: the one real comparison in the brochure */}
        <article className="mt-5 grid gap-8 rounded-[1.75rem] bg-cocoa p-7 text-porcelain md:grid-cols-[auto_1fr] md:items-center md:gap-16 md:p-12">
          <div className="flex items-end gap-6 md:gap-10" aria-hidden="true">
            <div>
              <div className="display text-[clamp(4.5rem,12vw,7.5rem)] leading-[0.85] text-blush">3</div>
              <div className="mt-2 text-step--1">שבועות עם השיטה</div>
            </div>
            <div className="pb-1 text-porcelain/60">
              <div className="display text-[clamp(2rem,6vw,3.25rem)] leading-[0.85] line-through decoration-1">חודשיים</div>
              <div className="mt-2 text-step--1">כמו אצל כולן</div>
            </div>
          </div>
          <div>
            <h3 className="display text-step-3">{marketing.method.title}</h3>
            {marketing.method.body.map((p) => (
              <p key={p} className="mt-4 max-w-[48ch] text-porcelain/85">
                {p}
              </p>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
