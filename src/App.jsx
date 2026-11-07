import Header from './components/Header'
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
        <Hero />
        <Intro />
        <Days />
        <Marketing />
        <Results />
        <Included />
        <Testimonials />
        <Register />
        <Graduates />
      </main>
      <Footer />
    </>
  )
}
