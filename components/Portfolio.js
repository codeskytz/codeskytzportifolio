import projects from '../data/portfolio.json'
import Image from 'next/image'
import Link from 'next/link'

export default function Portfolio(){
  return (
    <section id="our-works" className="py-12">
      <h2 className="text-2xl font-semibold mb-6">Our Works</h2>
      <p className="text-gray-600 mb-6">A selection of projects we've built. Click Explore to see galleries and details, or Take Yours to start your project with us.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(p=> (
          <article key={p.id} className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg border-2 border-gray-100 dark:border-slate-800">
            <div className="relative w-full h-56 sm:h-64">
              <Image src={`/images/projects/${p.id}.jpg`} alt={p.title} fill className="object-cover" placeholder="blur" blurDataURL="/images/placeholder.png" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.summary}</p>

              <div className="mt-4 flex gap-3">
                <Link href={`/portfolio/${p.id}`} className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 transition">Explore</Link>
                <Link href="/contact" className="inline-flex items-center px-4 py-2 rounded-full border font-semibold">Take Yours</Link>
                {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="ml-auto text-sm text-cyan underline">Open Live</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
