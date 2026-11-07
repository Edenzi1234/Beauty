import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import { intro } from '../content/course'

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
          <h2 className="display text-[clamp(2.25rem,5.5vw,3.75rem)]">{intro.title}</h2>
          <p className="mt-6 max-w-[42ch] text-step-1 leading-relaxed text-cocoa-soft">{intro.body}</p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] bg-petal/40 sm:grid-cols-2">
            {intro.benefits.map((b) => (
              <li key={b} className="flex min-h-32 items-end bg-porcelain p-6 text-step-1 leading-snug">
                {b}
              </li>
            ))}
          </ul>

          {/* The method: the one real comparison in the brochure */}
          <div className="mt-16 rounded-[2rem] bg-blush px-7 py-10 md:px-12 md:py-14">
            <h3 className="display text-step-3">{intro.method.title}</h3>
            <div className="mt-8 flex items-end gap-6 md:gap-10" aria-hidden="true">
              <div>
                <div className="display text-[clamp(4rem,12vw,7rem)] leading-[0.85] text-rose">3</div>
                <div className="mt-2 text-step--1">שבועות — עם השיטה</div>
              </div>
              <div className="pb-1 opacity-55">
                <div className="display text-[clamp(2rem,6vw,3.25rem)] leading-[0.85] line-through decoration-1">חודשיים</div>
                <div className="mt-2 text-step--1">כמו אצל כולן</div>
              </div>
            </div>
            {intro.method.body.map((p) => (
              <p key={p} className="mt-6 max-w-[48ch] text-step-0 first-of-type:mt-8">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 border-t border-cocoa/15 pt-8">
            <h3 className="display text-step-2">{intro.marketing.title}</h3>
            <p className="mt-3 max-w-[48ch] text-cocoa-soft">{intro.marketing.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
