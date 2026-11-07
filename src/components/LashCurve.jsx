/**
 * The brand motif: a lifted lash line — one sweeping lid curve with
 * lashes fanning upward. Paths carry `data-draw` so GSAP can draw them in.
 */
export default function LashCurve({ className = '', strokeWidth = 1.4 }) {
  // Lashes are sampled along the lid curve and point outward/upward
  const lashes = Array.from({ length: 15 }, (_, i) => {
    const t = (i + 1) / 16
    const x = 20 + t * 560
    const y = 150 - Math.sin(Math.PI * t) * 110
    const angle = (t - 0.5) * 1.4 // fan from left to right
    const len = 26 + Math.sin(Math.PI * t) * 34
    const x2 = x + Math.sin(angle) * len
    const y2 = y - Math.cos(angle) * len
    const cx = x + Math.sin(angle) * len * 0.2 + (t < 0.5 ? -6 : 6)
    const cy = y - Math.cos(angle) * len * 0.75
    return `M${x.toFixed(1)} ${y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
  })

  return (
    <svg
      viewBox="0 0 600 170"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path data-draw d="M20 150 C 140 10, 460 10, 580 150" strokeWidth={strokeWidth * 1.4} />
      {lashes.map((d, i) => (
        <path key={i} data-draw data-lash d={d} strokeWidth={strokeWidth} />
      ))}
    </svg>
  )
}
