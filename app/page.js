import Hero from '../components/Hero'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'

export default function Page(){
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <Services />
        <Portfolio />
      </main>
    </div>
  )
}
