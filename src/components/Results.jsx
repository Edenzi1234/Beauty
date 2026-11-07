import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import SectionHeader from './SectionHeader'

export default function Results({ label, title, images }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    // Cinematic curtain reveal on larger screens; native swipe on phones
    mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
      const q = gsap.utils.selector(root)
      q('[data-shot]').forEach((shot, i) => {
        const img = shot.querySelector('img')
        gsap.fromTo(
          shot,
          { clipPath: 'inset(100% 0% 0% 0% round 1.5rem)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
            duration: 1.4,
            delay: i * 0.12,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: q('[data-grid]')[0], start: 'top 75%' },
          },
        )
        gsap.fromTo(img, { scale: 1.25 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: shot, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="results" ref={root} className="py-24 md:py-36">
      <div className="shell">
        <SectionHeader label={label} title={title} />
      </div>

      <div
        data-grid
        className="snap-row mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:shell md:mt-20 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0"
      >
        {images.map((img, i) => (
          <figure
            key={img.src}
            data-shot
            className={`relative aspect-[4/5] w-[78vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-3xl bg-blush md:w-auto md:max-w-none ${
              i % 2 === 1 ? 'md:translate-y-16' : ''
            }`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="size-full object-cover will-change-transform" />
          </figure>
        ))}
      </div>
    </section>
  )
}
