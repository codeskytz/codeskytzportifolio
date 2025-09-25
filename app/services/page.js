import ServiceCard from '../../components/ServiceCard'
import { WhatsappLogo, AiLogo, WebLogo, ShieldLogo, ApiLogo } from '../../lib/serviceLogos'

export default function ServicesPage(){
  const services = [
    {title:'WhatsApp Bot Automation', desc:'Chatbots, flows and automations on WhatsApp', slug:'whatsapp-bot', color:'#25D366', logo:<WhatsappLogo/>},
    {title:'AI Solutions', desc:'Custom models and AI integrations', slug:'ai-solutions', color:'#7C3AED', logo:<AiLogo/>},
    {title:'Web Development', desc:'Web apps, SPA/SSR and modern frontends', slug:'web-development', color:'#2563EB', logo:<WebLogo/>},
    {title:'System Security', desc:'Pen tests, hardening and secure design', slug:'system-security', color:'#0EA5A4', logo:<ShieldLogo/>},
    {title:'API Services', desc:'Design, implementation and integration', slug:'api-services', color:'#8B5CF6', logo:<ApiLogo/>}
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
