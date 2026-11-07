import { useEffect, useState } from 'react'
import { brand } from '../content/course'

const courseLinks = [
  { href: '#days', label: 'תוכנית הקורס' },
  { href: '#marketing', label: 'שיווק' },
  { href: '#results', label: 'תוצאות' },
]

export default function Header({ links = courseLinks, cta = { href: '#register', label: 'הרשמה' } }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-500 ${
        scrolled
          ? 'bg-porcelain/80 shadow-[0_1px_0_rgb(59_42_44/0.08)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="shell flex h-16 items-center justify-between">
        <a href="#top" className="display text-[1.35rem] tracking-[0.18em]" dir="ltr" aria-label={brand.name}>
          {brand.name}
        </a>
        <nav className="flex items-center gap-6 text-step--1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hidden hover:text-rose sm:inline">
              {l.label}
            </a>
          ))}
          <a
            href={cta.href}
            className="btn btn-ghost min-h-10 px-5 text-step--1"
            {...(cta.external ? { target: '_blank', rel: 'noopener' } : {})}
          >
            {cta.label}
          </a>
        </nav>
      </div>
    </header>
  )
}
