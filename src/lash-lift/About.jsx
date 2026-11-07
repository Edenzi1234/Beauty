import SectionHeader from '../components/SectionHeader'
import { about } from '../content/lashLift'

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <div className="shell">
        <SectionHeader label={about.label} title={about.title} />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-petal/50 md:mt-20 md:grid-cols-3">
          {about.steps.map((step) => (
            <li key={step.title} className="bg-porcelain p-8 md:p-10">
              <h3 className="display text-[clamp(2.5rem,6vw,3.75rem)] leading-none text-rose">{step.title}</h3>
              <p className="mt-4 text-cocoa-soft">{step.body}</p>
            </li>
          ))}
        </ol>

        <article className="mt-5 rounded-[1.75rem] bg-cocoa p-8 text-porcelain md:p-12">
          <h3 className="display text-step-3">{about.botox.title}</h3>
          <p className="mt-4 max-w-[56ch] text-step-1 leading-relaxed text-porcelain/85">{about.botox.body}</p>
        </article>
      </div>
    </section>
  )
}
