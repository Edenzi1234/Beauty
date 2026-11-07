/**
 * One heading pattern for every section: a short label that names the
 * part of the page, the section title, and an optional sentence below it.
 */
export default function SectionHeader({ label, title, subtitle, className = '', tone = 'rose' }) {
  return (
    <header className={`max-w-2xl ${className}`}>
      {label && (
        <p className={`mb-4 flex items-center gap-3 text-step-0 font-semibold ${tone === 'rose' ? 'text-rose' : 'text-cocoa'}`}>
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {label}
        </p>
      )}
      <h2 className="display text-[clamp(2.25rem,5.5vw,3.75rem)]">{title}</h2>
      {subtitle && <p className="mt-4 max-w-[46ch] text-step-1 leading-relaxed text-cocoa-soft">{subtitle}</p>}
    </header>
  )
}
