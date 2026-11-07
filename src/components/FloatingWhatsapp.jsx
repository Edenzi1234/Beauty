import { useEffect, useState } from 'react'
import { whatsappHref } from '../lib/whatsapp'
import WhatsappIcon from './WhatsappIcon'

/** Appears once the hero is out of view, hides again over the registration block. */
export default function FloatingWhatsapp() {
  const [visible, setVisible] = useState(false)
  const href = whatsappHref()

  useEffect(() => {
    const hero = document.getElementById('top')
    const register = document.getElementById('register')
    let heroVisible = true
    let registerVisible = false
    const update = () => setVisible(!heroVisible && !registerVisible)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === hero) heroVisible = e.isIntersecting
          if (e.target === register) registerVisible = e.isIntersecting
        })
        update()
      },
      { threshold: 0.15 },
    )
    hero && io.observe(hero)
    register && io.observe(register)
    return () => io.disconnect()
  }, [])

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener"
      aria-label="שליחת הודעה בוואטסאפ"
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 z-50 flex items-center gap-2 rounded-full bg-cocoa py-3.5 pe-5 ps-4 text-porcelain shadow-[0_12px_32px_-8px_rgb(59_42_44/0.45)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-rose ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <WhatsappIcon className="size-6" />
      <span className="text-step--1 font-semibold">וואטסאפ</span>
    </a>
  )
}
