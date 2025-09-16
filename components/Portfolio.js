import projects from '../data/portfolio.json'

export default function Portfolio(){
  return (
    <section id="portfolio" className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(p=> (
          <article key={p.id} className="border rounded p-4 bg-white dark:bg-slate-900">
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{p.summary}</p>
            <div className="mt-2 flex gap-2 flex-wrap">
              {p.tags.map(t=> <span key={t} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">{t}</span>)}
            </div>
            <div className="mt-4 flex gap-2">
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="text-cyan">Live</a>}
              {p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
