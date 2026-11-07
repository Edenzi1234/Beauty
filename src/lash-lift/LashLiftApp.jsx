import Header from '../components/Header'
import Hero from '../components/Hero'
import Results from '../components/Results'
import Footer from '../components/Footer'
import { brand } from '../content/course'
import { bookingUrl, hero, location, results } from '../content/lashLift'
import About from './About'
import Details from './Details'
import Booking from './Booking'
import FloatingBooking from './FloatingBooking'

const book = { href: bookingUrl, label: 'לקביעת תור', external: true }

export default function LashLiftApp() {
  return (
    <>
      <Header
        links={[
          { href: '#about', label: 'על הטיפול' },
          { href: '#details', label: 'פרטים ומחיר' },
          { href: '#results', label: 'תוצאות' },
        ]}
        cta={book}
      />
      <main>
        <Hero
          kicker={brand.hebrewName}
          title={hero.title}
          lead={hero.lead}
          location={location}
          actions={[book, { href: '#details', label: 'פרטים ומחיר' }]}
          image={hero.image}
          imageAlt={hero.imageAlt}
          imageWidth="800"
          imageHeight="800"
          imageMode="circle"
        />
        <About />
        <Details />
        <Results label={results.label} title={results.title} images={results.images} />
        <Booking />
      </main>
      <Footer />
      <FloatingBooking />
    </>
  )
}
