export default function ServicesPage(){
  const services = [
    {title:'Web Development', desc:'Web apps, SPA/SSR'},
    {title:'System Security', desc:'Pen tests, hardening'},
    {title:'AI Solutions', desc:'Models, integrations'},
    {title:'WhatsApp Bot Automation', desc:'Chatbots, flows'},
    {title:'API Services', desc:'Design and integration'}
  ]

  return (
    <section id="services" className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(s=> (
          <div key={s.title} className="p-4 border rounded bg-white dark:bg-slate-900">
            <h3 className="font-bold">{s.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
