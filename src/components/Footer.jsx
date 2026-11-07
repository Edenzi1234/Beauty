import { brand } from '../content/course'

export default function Footer() {
  return (
    <footer className="bg-cocoa py-8 text-step--1 text-porcelain/70">
      <div className="shell flex flex-wrap items-center justify-between gap-4">
        <span className="display text-step-1 tracking-[0.18em] text-porcelain" dir="ltr">
          {brand.name}
        </span>
        <span>
          © {new Date().getFullYear()} {brand.hebrewName}
        </span>
      </div>
    </footer>
  )
}
