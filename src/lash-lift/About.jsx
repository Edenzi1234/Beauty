import SectionHeader from '../components/SectionHeader'
import { about } from '../content/lashLift'

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <div className="shell">
        <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <div className="arch mx-auto w-full max-w-sm">
            <img src={about.image} alt={about.imageAlt} loading="lazy" width="1000" height="1427" className="aspect-[3/4] w-full object-cover" />
          </div>

          <div>
            <SectionHeader label={about.label} title={about.title} />
            <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] bg-petal/50">
              {about.steps.map((step) => (
                <li key={step.title} className="flex flex-wrap items-baseline gap-x-6 gap-y-2 bg-porcelain px-7 py-6">
                  <h3 className="display w-28 text-[clamp(2.25rem,5vw,3rem)] leading-none text-rose">{step.title}</h3>
                  <p className="text-cocoa-soft">{step.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <article className="mt-5 rounded-[1.75rem] bg-cocoa p-8 text-porcelain md:p-12">
          <h3 className="display text-step-3">{about.botox.title}</h3>
          <p className="mt-4 max-w-[56ch] text-step-1 leading-relaxed text-porcelain/85">{about.botox.body}</p>
        </article>
      </div>
    </section>
  )
}
