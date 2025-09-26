import ServiceCard from '../../components/ServiceCard'
import { FontAwesomeIcon } from '../../lib/icons'

export default function ServicesPage(){
  const services = [
    {title:'WhatsApp Bot Automation', desc:'Chatbots, flows and automations on WhatsApp', slug:'whatsapp-bot', color:'#25D366', icon:['fab','whatsapp']},
    {title:'AI Solutions', desc:'Custom models and AI integrations', slug:'ai-solutions', color:'#7C3AED', icon:['fab','github']},
    {title:'Web Development', desc:'Web apps, SPA/SSR and modern frontends', slug:'web-development', color:'#2563EB', icon:['fas','laptop-code']},
    {title:'System Security', desc:'Pen tests, hardening and secure design', slug:'system-security', color:'#0EA5A4', icon:['fas','shield-alt']},
    {title:'API Services', desc:'Design, implementation and integration', slug:'api-services', color:'#8B5CF6', icon:['fas','server']}
  ]

  return (
    <section id="services" className="py-12">
      <h2 className="text-2xl font-semibold mb-6">Services</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {services.map(s=> (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </section>
  )
}
