import dynamic from 'next/dynamic'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'

const Hero = dynamic(() => import('../components/Hero'), { ssr: false })

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
