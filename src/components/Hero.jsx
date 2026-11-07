import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import { brand, hero } from '../content/course'
import { whatsappHref } from '../lib/whatsapp'
import LashCurve from './LashCurve'
import WhatsappIcon from './WhatsappIcon'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root)
      const drawPaths = q('[data-hero-lash] [data-draw]')
      drawPaths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      // One orchestrated opening sequence
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(q('[data-arch]'), { clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)', duration: 1.6, ease: 'expo.inOut' })
        .from(q('[data-portrait]'), { yPercent: 18, opacity: 0, duration: 1.6 }, '-=0.9')
        .from(q('[data-wordmark]'), { opacity: 0, letterSpacing: '0.6em', duration: 2.2, ease: 'power3.out' }, '<')
        .from(q('[data-line]'), { yPercent: 110, duration: 1.3, stagger: 0.12 }, '-=1.9')
        .to(drawPaths[0], { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, '-=1')
        .to(drawPaths.slice(1), { strokeDashoffset: 0, duration: 0.6, stagger: 0.035, ease: 'power2.out' }, '-=0.7')
        .from(q('[data-fade]'), { opacity: 0, y: 16, duration: 1, stagger: 0.1 }, '-=1')

      // Depth on scroll: portrait, arch and wordmark move at different speeds
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(q('[data-portrait]'), { yPercent: -10, ease: 'none', scrollTrigger: st })
      gsap.to(q('[data-arch]'), { yPercent: 6, ease: 'none', scrollTrigger: st })
      gsap.to(q('[data-wordmark]'), { xPercent: 12, ease: 'none', scrollTrigger: st })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="top" ref={root} className="relative isolate min-h-[100svh] overflow-hidden pt-16">
      {/* Giant Latin wordmark behind everything */}
      <div
        data-wordmark
        dir="ltr"
        aria-hidden="true"
        className="display pointer-events-none absolute inset-x-0 bottom-[6%] -z-10 select-none whitespace-nowrap text-center text-[26vw] leading-none tracking-[0.02em] text-blush md:bottom-[4%] md:text-[19vw]"
      >
        {brand.name}
      </div>

      <div className="shell grid min-h-[calc(100svh-4rem)] items-end gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10">
        {/* Copy */}
        <div className="relative z-10 pt-8 md:pt-0">
          <p data-fade className="mb-3 text-step-0 text-cocoa-soft md:mb-5">
            {brand.hebrewName}
          </p>

          <h1 className="display text-[clamp(2.75rem,8.4vw,6.25rem)]">
            {hero.title.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p data-fade className="mt-5 max-w-[34ch] text-step-0 leading-relaxed text-cocoa-soft md:mt-6 md:text-step-1">
            {hero.lead}
          </p>

          <div data-fade className="mt-7 flex flex-wrap gap-3 md:mt-8">
            <a href={whatsappHref()} className="btn btn-solid" target={whatsappHref().startsWith('http') ? '_blank' : undefined} rel="noopener">
              <WhatsappIcon />
              לפרטים והרשמה
            </a>
            <a href="#days" className="btn btn-ghost max-sm:hidden">
              מה לומדים בקורס
            </a>
          </div>
        </div>

        {/* Portrait in arch */}
        <div className="relative mx-auto w-[min(74vw,26rem)] self-end md:w-full md:max-w-[30rem]">
          <div
            data-arch
            className="arch absolute inset-x-[6%] bottom-0 top-[17%] bg-gradient-to-b from-blush via-[#f1d0cc] to-nude"
          />
          <div data-hero-lash className="absolute inset-x-[-2%] top-0 text-rose">
            <LashCurve className="w-full" strokeWidth={1.2} />
          </div>
          <img
            data-portrait
            src={hero.image}
            alt={hero.imageAlt}
            width="900"
            height="1333"
            fetchPriority="high"
            className="relative mx-auto mt-[24%] w-[84%] will-change-transform"
          />
        </div>
      </div>
    </section>
  )
}
