import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import { intro } from '../content/course'
import SectionHeader from './SectionHeader'

export default function Intro() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root)
      gsap.fromTo(
        q('[data-zoom]'),
        { scale: 1.18 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: q('[data-frame]')[0], start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="course" ref={root} className="py-24 md:py-36">
      <div className="shell grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div data-frame className="arch relative aspect-[3/4] w-full max-w-sm justify-self-center md:sticky md:top-24 md:self-start">
          <img data-zoom src={intro.image} alt={intro.imageAlt} loading="lazy" width="657" height="951" className="size-full object-cover" />
        </div>

        <div>
          <SectionHeader label={intro.label} title={intro.title} subtitle={intro.body} />

          <h3 className="display mt-14 text-step-2">{intro.benefitsTitle}</h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[1.75rem] bg-petal/40 sm:grid-cols-2">
            {intro.benefits.map((b) => (
              <li key={b} className="flex min-h-32 items-end bg-porcelain p-6 text-step-1 leading-snug">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
