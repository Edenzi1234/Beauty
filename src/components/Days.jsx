import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import { days } from '../content/course'
import SectionHeader from './SectionHeader'

export default function Days() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root)
      // The timeline thread fills as the reader moves through the days
      gsap.fromTo(
        q('[data-thread]'),
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 70%', end: 'bottom 70%', scrub: 0.6 } },
      )
      q('[data-day]').forEach((el) => {
        gsap.to(el.querySelector('[data-dot]'), {
          backgroundColor: '#a85e6a',
          scale: 1,
          scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="days" ref={root} className="bg-gradient-to-b from-porcelain via-nude to-porcelain py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          label="תוכנית הלימוד"
          title="שני ימי לימוד"
          subtitle="יום אחרי יום — מהבסיס העיוני ועד עבודה מעשית על מודליסטיות."
        />

        <ol data-list className="relative mt-16 md:mt-24">
          {/* Thread */}
          <span aria-hidden="true" className="absolute inset-y-2 start-[0.6rem] w-px bg-cocoa/12 md:start-[calc(25%+0.6rem)]" />
          <span data-thread aria-hidden="true" className="absolute inset-y-2 start-[0.6rem] w-px origin-top bg-rose md:start-[calc(25%+0.6rem)]" />

          {days.map((day, i) => (
            <li data-day key={day.label} className="relative grid gap-4 pb-16 ps-12 last:pb-0 md:grid-cols-[25%_1fr] md:gap-0 md:ps-0">
              <span
                data-dot
                aria-hidden="true"
                className="absolute start-0 top-3 size-[1.25rem] scale-75 rounded-full border border-rose bg-porcelain md:start-[25%]"
              />
              <div className="md:pe-10 md:text-end">
                <div className="display text-[clamp(3.5rem,8vw,6rem)] leading-[0.8] text-petal" aria-hidden="true">
                  {i + 1}
                </div>
                <div className="mt-2 text-step--1 text-cocoa-soft">{day.duration}</div>
              </div>

              <div className="md:ps-14">
                <h3 className="display text-step-3">
                  {day.label}
                  {day.title && <span className="block text-step-2 text-cocoa-soft">{day.title}</span>}
                </h3>

                <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {day.items.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-cocoa/10 pb-3">
                      <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-rose" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
