import Link from 'next/link'

const serviceData = {
  'whatsapp-bot': {
    title: 'WhatsApp Bot Automation',
    desc: 'How our WhatsApp bots automate customer conversations and workflows.',
    youtube: 'dQw4w9WgXcQ',
    color: '#25D366'
  },
  'ai-solutions': {
    title: 'AI Solutions',
    desc: 'Custom AI models and integrations to add intelligence to products.',
    youtube: 'dQw4w9WgXcQ',
    color: '#7C3AED'
  },
  'web-development': {
    title: 'Web Development',
    desc: 'Robust, modern web applications and frontends.',
    youtube: 'dQw4w9WgXcQ',
    color: '#2563EB'
  },
  'system-security': {
    title: 'System Security',
    desc: 'Penetration testing, hardening and secure architecture.',
    youtube: 'dQw4w9WgXcQ',
    color: '#0EA5A4'
  },
  'api-services': {
    title: 'API Services',
    desc: 'Designing and integrating reliable APIs.',
    youtube: 'dQw4w9WgXcQ',
    color: '#8B5CF6'
  }
}

export default function ServiceDetail({ params }){
  const { slug } = params;
  const svc = serviceData[slug];
  if(!svc) return <div className="p-8">Service not found</div>

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold" style={{color: svc.color}}>{svc.title}</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{svc.desc}</p>

        <div className="mt-6 bg-black aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${svc.youtube}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>

        <p className="mt-6 text-gray-700 dark:text-gray-300">This video explains how our {svc.title.toLowerCase()} work and how they can streamline operations for your business. We offer tailored deployments and integrations to match your needs.</p>

        <div className="mt-6 flex gap-4">
          <Link href="/contact" className="px-5 py-2 rounded-full text-white font-semibold" style={{background: svc.color}}>Get your own now</Link>
          <Link href="/services" className="px-5 py-2 rounded-full border">Back to Services</Link>
        </div>
      </div>
    </section>
  )
}
