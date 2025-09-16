export default function Services(){
  const services = [
    {title:'Web Development', desc:'Web apps, SPA/SSR, performant frontends'},
    {title:'System Security', desc:'Pen tests, hardening, audits'},
    {title:'AI Solutions', desc:'Models, integrations, pipelines'}
  ]

  return (
    <section id="services" className="py-12">
      <h2 className="text-2xl font-semibold mb-6">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(s=> (
          <div key={s.title} className="p-4 border rounded-lg bg-white dark:bg-slate-900">
            <h3 className="font-bold">{s.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
