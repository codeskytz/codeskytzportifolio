export default function Portfolio(){
  const frames = [
    {id:1, title:'Personal portifolio', src:'https://mrshitcointz.vercel.app/'},
    {id:2, title:'SaaS dashboard', src:'https://mrshitcointz.vercel.app/'},
    {id:3, title:'Marketing site', src:'https://anagroupsupplies.vercel.app/'},
    {id:4, title:'Web app showcase', src:'https://mrshitcointz.vercel.app/'}
  ]

  return (
    <section id="our-works" className="py-12">
      <h2 className="text-2xl font-semibold mb-6">Our Works</h2>
      <p className="text-gray-600 mb-6">A selection of interactive demos and live sites we've built. Click to explore.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {frames.map(f=> (
          <div key={f.id} className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg transform hover:scale-102 transition duration-400 border-2 border-gray-100 dark:border-slate-800">
            <div className="p-4 border-b border-gray-100 dark:border-slate-800">
              <h3 className="font-semibold">{f.title}</h3>
            </div>
            <div className="aspect-video">
              <iframe src={f.src} title={f.title} className="w-full h-full border-none" loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
