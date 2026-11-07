import { useEffect, useState } from 'react'
import { bookingUrl } from '../content/lashLift'

/** Booking button that follows the reader once the opening screen is out of view. */
export default function FloatingBooking() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const book = document.getElementById('book')
    let heroVisible = true
    let bookVisible = false
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === hero) heroVisible = e.isIntersecting
          if (e.target === book) bookVisible = e.isIntersecting
        })
        setVisible(!heroVisible && !bookVisible)
      },
      { threshold: 0.1 },
    )
    hero && io.observe(hero)
    book && io.observe(book)
    return () => io.disconnect()
  }, [])

  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener"
      className={`btn btn-solid fixed inset-x-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 shadow-[0_14px_32px_-10px_rgb(59_42_44/0.5)] transition-[opacity,transform] duration-500 sm:inset-x-auto sm:left-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      לקביעת תור
    </a>
  )
}
