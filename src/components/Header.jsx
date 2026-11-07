import { useEffect, useState } from 'react'
import { brand } from '../content/course'

export default function Header() {
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
          <a href="#days" className="hidden hover:text-rose sm:inline">
            תוכנית הקורס
          </a>
          <a href="#marketing" className="hidden hover:text-rose sm:inline">
            שיווק
          </a>
          <a href="#results" className="hidden hover:text-rose sm:inline">
            תוצאות
          </a>
          <a href="#register" className="btn btn-ghost min-h-10 px-5 text-step--1">
            הרשמה
          </a>
        </nav>
      </div>
    </header>
  )
}
