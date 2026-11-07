import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// iOS Safari: don't recalculate every time the address bar shows/hides
ScrollTrigger.config({ ignoreMobileResize: true })

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger }
