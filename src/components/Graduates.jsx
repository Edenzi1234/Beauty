import SectionHeader from './SectionHeader'

// Every photo in assets/images/graduates is shown automatically, in file-name order.
// To add a graduate, drop a new image into that folder.
const photos = Object.entries(
  import.meta.glob('../assets/images/graduates/*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)

// A small, repeating tilt so the wall feels pinned by hand, not gridded
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-[1.5deg]', 'rotate-[1.5deg]']

export default function Graduates() {
  if (photos.length === 0) return null

  return (
    <section id="graduates" className="overflow-hidden bg-blush py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          label="בוגרות הקורס"
          title="התלמידות שלי"
          subtitle="כל אחת מהן יצאה מהקורס עם תעודת סיום ביד."
        />

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:mt-20 md:gap-x-7 md:gap-y-10 lg:grid-cols-4">
          {photos.map((src, i) => (
            <li
              key={src}
              className={`${tilts[i % tilts.length]} bg-white p-2 pb-7 shadow-[0_20px_40px_-22px_rgb(154_63_82/0.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:rotate-0 hover:scale-[1.03] md:p-3 md:pb-10 ${
                i % 2 === 1 ? 'mt-6 md:mt-10' : ''
              }`}
            >
              <img
                src={src}
                alt="בוגרת הקורס עם תעודת הסיום שלה"
                loading="lazy"
                width="720"
                height="864"
                className="aspect-[5/6] w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
