import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Days from './components/Days'
import Results from './components/Results'
import Included from './components/Included'
import Testimonials from './components/Testimonials'
import Register from './components/Register'
import FloatingWhatsapp from './components/FloatingWhatsapp'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Days />
        <Results />
        <Included />
        <Testimonials />
        <Register />
      </main>
      <FloatingWhatsapp />
    </>
  )
}
