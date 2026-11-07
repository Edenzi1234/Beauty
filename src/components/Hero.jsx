import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import { brand } from '../content/course'
import PinIcon from './PinIcon'
import LashCurve from './LashCurve'

/**
 * Opening screen shared by every page.
 * imageMode 'cutout' = transparent portrait standing in the arch; 'cover' = photo filling the arch;
 * 'circle' = round portrait under the lash curve, like an eye.
 */
export default function Hero({ kicker, title, lead, location, actions = [], image, imageAlt, imageWidth, imageHeight, imageMode = 'cutout' }) {
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
      // Parallax lives on a wrapper so it never fights the intro tween on the image itself
      gsap.to(q('[data-parallax]'), { yPercent: -10, ease: 'none', scrollTrigger: st })
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
            {kicker}
          </p>

          <h1 className="display text-[clamp(2.75rem,8.4vw,6.25rem)]">
            {title.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p data-fade className="mt-5 max-w-[34ch] text-step-0 leading-relaxed text-cocoa-soft md:mt-6 md:text-step-1">
            {lead}
          </p>

          {location && (
            <p data-fade className="mt-4 flex items-center gap-2 text-step-0 text-cocoa-soft">
              <PinIcon className="size-5 shrink-0 text-rose" />
              {location}
            </p>
          )}

          <div data-fade className="mt-7 flex flex-wrap gap-3 md:mt-8">
            {actions.map((a, i) => (
              <a
                key={a.href}
                href={a.href}
                className={`btn ${i === 0 ? 'btn-solid' : 'btn-ghost'}`}
                {...(a.external ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>

        {/* Portrait in arch */}
        <div className="relative mx-auto w-[min(74vw,26rem)] self-end md:w-full md:max-w-[30rem]">
          <div data-hero-lash className="absolute inset-x-[-2%] top-0 z-10 text-rose">
            <LashCurve className="w-full" strokeWidth={1.2} />
          </div>
          {imageMode === 'circle' ? (
            <div data-parallax className="relative mx-[9%] mt-[20%] will-change-transform md:mx-[13%] md:mt-[15%] md:mb-10">
              <div data-arch className="aspect-square overflow-hidden rounded-full bg-blush shadow-[0_40px_80px_-40px_rgb(154_63_82/0.6)]">
                <img
                  data-portrait
                  src={image}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  fetchPriority="high"
                  className="size-full object-cover"
                />
              </div>
            </div>
          ) : imageMode === 'cover' ? (
            <div data-arch className="arch relative mx-[6%] mt-[17%] aspect-[3/4] bg-blush">
              <div data-parallax className="h-[112%] will-change-transform">
                <img
                  data-portrait
                  src={image}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  fetchPriority="high"
                  className="size-full object-cover"
                />
              </div>
            </div>
          ) : (
            <>
              <div
                data-arch
                className="arch absolute inset-x-[6%] bottom-0 top-[17%] bg-gradient-to-b from-blush to-petal/70"
              />
              <div data-parallax className="relative will-change-transform">
                <img
                  data-portrait
                  src={image}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  fetchPriority="high"
                  className="mx-auto mt-[24%] w-[84%]"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
