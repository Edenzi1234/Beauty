import Header from './components/Header'
import { brand, hero, location, results } from './content/course'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Days from './components/Days'
import Marketing from './components/Marketing'
import Results from './components/Results'
import Included from './components/Included'
import Testimonials from './components/Testimonials'
import Register from './components/Register'
import Graduates from './components/Graduates'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero
          kicker={brand.hebrewName}
          title={hero.title}
          lead={hero.lead}
          location={`${location.city}, ${location.area}`}
          actions={[
            { href: '#days', label: 'מה לומדים בקורס' },
            { href: '#register', label: 'מחיר והרשמה' },
          ]}
          image={hero.image}
          imageAlt={hero.imageAlt}
          imageWidth="900"
          imageHeight="1333"
        />
        <Intro />
        <Days />
        <Marketing />
        <Results label={results.label} title={results.title} images={results.images} />
        <Included />
        <Testimonials />
        <Register />
        <Graduates />
      </main>
      <Footer />
    </>
  )
}
